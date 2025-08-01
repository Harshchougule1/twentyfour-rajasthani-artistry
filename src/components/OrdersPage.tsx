import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  postal_code: string;
  notes: string;
  created_at: string;
  order_items: {
    product_title: string;
    product_price: number;
    quantity: number;
    subtotal: number;
    product_image: string;
  }[];
}

interface OrdersPageProps {
  onBack: () => void;
}

export const OrdersPage = ({ onBack }: OrdersPageProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              product_title,
              product_price,
              quantity,
              subtotal,
              product_image
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>
        <div className="text-center">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Order {order.order_number}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {order.order_items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded">
                          <img 
                            src={item.product_image} 
                            alt={item.product_title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.product_title}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} × ₹{item.product_price.toLocaleString()}
                            </p>
                          </div>
                          <p className="font-semibold">₹{item.subtotal.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Information</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Name:</strong> {order.customer_name}</p>
                      <p><strong>Email:</strong> {order.customer_email}</p>
                      <p><strong>Phone:</strong> {order.customer_phone}</p>
                      <p><strong>Address:</strong> {order.shipping_address}</p>
                      <p><strong>City:</strong> {order.city}, {order.state} - {order.postal_code}</p>
                      {order.notes && (
                        <p><strong>Notes:</strong> {order.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    Total: ₹{order.total_amount.toLocaleString()}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const whatsappMessage = `Hello! I need help with my order ${order.order_number}. Please provide me with the current status and tracking information.`;
                      const whatsappUrl = `https://wa.me/918459779392?text=${encodeURIComponent(whatsappMessage)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    Track Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};