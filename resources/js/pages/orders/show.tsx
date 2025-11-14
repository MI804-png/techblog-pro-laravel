import { Head, Link, router } from '@inertiajs/react'
import { ArrowLeft, Calendar, DollarSign, Package, MapPin, Phone, Mail, User } from 'lucide-react'
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
    user: {
        name: string
        email: string
    }
    restaurant: {
        id: number
        name: string
        cuisine_type: string
        address: string
        phone: string | null
        email: string | null
        image_url: string | null
    }
    dish: {
        id: number
        name: string
        description: string | null
        price: number
        image_url: string | null
    }
}

interface Props {
    order: Order
}

export default function OrderShow({ order }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
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

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel this order?')) {
            router.post(`/orders/${order.id}/cancel`)
        }
    }

    return (
        <AppLayout>
            <Head title={`Order #${order.id}`} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/orders"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Orders
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Order #{order.id}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {formatDate(order.order_date)}
                            </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </div>

                    {/* Restaurant Info */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Restaurant Details
                        </h2>
                        <div className="flex gap-4">
                            {order.restaurant.image_url && (
                                <img
                                    src={order.restaurant.image_url}
                                    alt={order.restaurant.name}
                                    className="w-24 h-24 rounded-lg object-cover"
                                />
                            )}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {order.restaurant.name}
                                </h3>
                                <p className="text-purple-600 mb-2">{order.restaurant.cuisine_type}</p>
                                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    <p className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {order.restaurant.address}
                                    </p>
                                    {order.restaurant.phone && (
                                        <p className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {order.restaurant.phone}
                                        </p>
                                    )}
                                    {order.restaurant.email && (
                                        <p className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {order.restaurant.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Order Items
                        </h2>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex gap-4">
                                {order.dish.image_url && (
                                    <img
                                        src={order.dish.image_url}
                                        alt={order.dish.name}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                        {order.dish.name}
                                    </h3>
                                    {order.dish.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {order.dish.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Package className="h-4 w-4" />
                                            Quantity: {order.quantity}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="h-4 w-4" />
                                            Unit Price: {formatCurrency(order.dish.price)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Special Instructions */}
                    {order.special_instructions && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Special Instructions
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 italic">
                                "{order.special_instructions}"
                            </p>
                        </div>
                    )}

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Order Summary
                        </h2>
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal ({order.quantity} items)</span>
                                <span>{formatCurrency(order.total_price)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2">
                                <span>Total</span>
                                <span className="text-purple-600">{formatCurrency(order.total_price)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    {order.status === 'pending' && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                            <Button
                                variant="destructive"
                                onClick={handleCancel}
                                className="w-full md:w-auto"
                            >
                                Cancel Order
                            </Button>
                        </div>
                    )}
                </div>

                {/* Customer Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Customer Information
                    </h2>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400">
                        <p><span className="font-medium">Name:</span> {order.user.name}</p>
                        <p><span className="font-medium">Email:</span> {order.user.email}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
