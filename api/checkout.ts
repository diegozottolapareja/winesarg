import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'edge' };

export default async function handler(request: Request) {
  if (request.method !== 'POST') return new Response("Solo se permite POST", { status: 405 });

  try {
    const { customer_name, payment_type, items } = await request.json();
    
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
      auth: { persistSession: false }
    });

    // 1. Calcular el monto total de la orden
    const total = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    
    // 2. Crear la orden en la cabecera
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ customer_name, payment_type, total_price: total }])
      .select('id')
      .single();

    if (orderError) throw new Error(`Error creando orden: ${orderError.message}`);

    // 3. Preparar los ítems para la inserción
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      wine_id: item.id,
      wine_name: item.name,
      price_at_sale: item.price,
      quantity: item.quantity
    }));

    // 4. Insertar los detalles de la venta
    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

    if (itemsError) {
      // Rollback manual de la cabecera si fallan los ítems
      await supabase.from('orders').delete().eq('id', order.id);
      throw new Error(`Error guardando productos: ${itemsError.message}`);
    }

    // 5. CAMBIO CRÍTICO: Descontar el stock de cada vino en la base de datos
    // Recorremos cada ítem vendido y actualizamos la tabla 'wines'
    for (const item of items) {
      // Ignoramos los productos mock de la maqueta local
      if (String(item.id).startsWith('mock-')) continue;

      // Primero obtenemos el stock actual de ese vino
      const { data: wineData, error: fetchError } = await supabase
        .from('wines')
        .select('stock')
        .eq('id', item.id)
        .single();

      if (fetchError || !wineData) {
        console.error(`No se pudo encontrar el vino con ID ${item.id} para actualizar stock.`);
        continue;
      }

      const nuevoStock = wineData.stock - item.quantity;

      // Actualizamos el stock con el nuevo valor calculado
      const { error: stockError } = await supabase
        .from('wines')
        .update({ stock: nuevoStock >= 0 ? nuevoStock : 0 }) // Evitamos que el stock quede en negativo
        .eq('id', item.id);

      if (stockError) {
        console.error(`Error actualizando stock para el vino ID ${item.id}:`, stockError.message);
        // En una arquitectura más avanzada podrías lanzar un rollback aquí, 
        // pero por ahora dejamos que continúe para no trabar la venta si el detalle ya se guardó.
      }
    }

    return new Response(JSON.stringify({ success: true, order_id: order.id }), { status: 200 });

  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}