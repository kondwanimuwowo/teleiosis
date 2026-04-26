import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabaseAdmin
    .from('teachings')
    .select('*')
    .eq('id', params.id)
    .single()
  
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData()
    
    const updateData: any = {
      title:                  formData.get('title'),
      speaker:                formData.get('speaker'),
      description:            formData.get('description'),
      category_id:            formData.get('category_id'),
      duration_minutes:       formData.get('duration_minutes') ? parseInt(formData.get('duration_minutes') as string) : null,
      price:                  formData.get('price') ? parseFloat(formData.get('price') as string) : null,
      series_id:              formData.get('series_id') || null,
      order_in_series:        formData.get('order_in_series') ? parseInt(formData.get('order_in_series') as string) : null,
      program_group_id:       formData.get('program_group_id') || null,
      included_in_membership: formData.get('included_in_membership') === 'true',
    }

    const { error } = await supabaseAdmin
      .from('teachings')
      .update(updateData)
      .eq('id', params.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await supabaseAdmin
    .from('teachings')
    .delete()
    .eq('id', params.id)
  
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
