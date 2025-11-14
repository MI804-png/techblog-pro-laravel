import { Head, Link } from '@inertiajs/react'
import { ShoppingBag, Calendar, DollarSign, Package } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'

interface Order {
    id: number
    quantity: number
    total_price: number
    status: string
    special_instructions: string | null
    order_date: string
    created_at: string
    restaurant: {
        id: number
        name: string
        cuisine_type: string
    }
    dish: {
        id: number
        name: string
        price: number
        image_url: string | null
    }
}

interface Props {
    orders: Order[]
}

export default function OrdersIndex({ orders }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'confirmed':
                return 'bg-blue-100 text-blue-800'
            case 'preparing':
                return 'bg-purple-100 text-purple-800'
            case 'ready':
                return 'bg-green-100 text-green-800'
            case 'delivered':
                return 'bg-gray-100 text-gray-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <AppLayout>
            <Head title="My Orders" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <ShoppingBag className="h-8 w-8" />
                            My Orders
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Track and manage your food orders
                        </p>
                    </div>
                    
                    <Link href="/restaurants">
                        <Button className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Order Food
                        </Button>
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No orders yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Start ordering delicious food from our restaurants!
                        </p>
                        <Link href="/restaurants">
                            <Button>Browse Restaurants</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    {/* Order Info */}
                                    <div className="flex gap-4 flex-1">
                                        {order.dish.image_url && (
                                            <img
                                                src={order.dish.image_url}
                                                alt={order.dish.name}
                                                className="w-20 h-20 rounded-lg object-cover"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {order.dish.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {order.restaurant.name} • {order.restaurant.cuisine_type}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                <div className="flex items-center gap-1">
                                                    <Package className="h-4 w-4" />
                                                    Quantity: {order.quantity}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="h-4 w-4" />
                                                    {formatCurrency(order.total_price)}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(order.order_date)}
                                                </div>
                                            </div>
                                            
                                            {order.special_instructions && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                                                    Note: {order.special_instructions}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Link href={`/orders/${order.id}`}>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                        {order.status === 'pending' && (
                                            <Link
                                                href={`/orders/${order.id}/cancel`}
                                                method="post"
                                                as="button"
                                            >
                                                <Button variant="destructive" size="sm">
                                                    Cancel
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
