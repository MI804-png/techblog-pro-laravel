import { Head, Link, useForm } from '@inertiajs/react'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface Dish {
    id: number
    name: string
    description: string | null
    price: number
    category: string
    image_url: string | null
    is_available: boolean
}

interface Restaurant {
    id: number
    name: string
    address: string
    cuisine_type: string
    image_url: string | null
}

interface Props {
    restaurant: Restaurant
    dishes: Dish[]
}

export default function OrderCreate({ restaurant, dishes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        restaurant_id: restaurant.id,
        dish_id: '',
        quantity: 1,
        special_instructions: '',
    })

    const selectedDish = dishes.find(d => d.id === parseInt(data.dish_id))
    const totalPrice = selectedDish ? selectedDish.price * data.quantity : 0

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/orders')
    }

    // Group dishes by category
    const dishesByCategory = dishes.reduce((acc, dish) => {
        if (!acc[dish.category]) {
            acc[dish.category] = []
        }
        acc[dish.category].push(dish)
        return acc
    }, {} as Record<string, Dish[]>)

    return (
        <AppLayout>
            <Head title={`Order from ${restaurant.name}`} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href={`/restaurants/${restaurant.id}`}
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Restaurant
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
                    <div className="flex flex-col md:flex-row">
                        {restaurant.image_url && (
                            <img
                                src={restaurant.image_url}
                                alt={restaurant.name}
                                className="w-full md:w-48 h-48 object-cover"
                            />
                        )}
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Order from {restaurant.name}
                            </h1>
                            <p className="text-purple-600 mb-2">{restaurant.cuisine_type}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {restaurant.address}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Place Your Order
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Select Dish */}
                        <div className="space-y-2">
                            <Label htmlFor="dish_id">Select Dish *</Label>
                            <Select
                                value={data.dish_id}
                                onValueChange={(value) => setData('dish_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a dish" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(dishesByCategory).map(([category, categoryDishes]) => (
                                        <div key={category}>
                                            <div className="px-2 py-1.5 text-sm font-semibold text-gray-700">
                                                {category}
                                            </div>
                                            {categoryDishes.map((dish) => (
                                                <SelectItem key={dish.id} value={dish.id.toString()}>
                                                    {dish.name} - {formatCurrency(dish.price)}
                                                </SelectItem>
                                            ))}
                                        </div>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.dish_id && (
                                <p className="text-sm text-red-600">{errors.dish_id}</p>
                            )}
                        </div>

                        {/* Selected Dish Preview */}
                        {selectedDish && (
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex gap-4">
                                {selectedDish.image_url && (
                                    <img
                                        src={selectedDish.image_url}
                                        alt={selectedDish.name}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {selectedDish.name}
                                    </h3>
                                    {selectedDish.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {selectedDish.description}
                                        </p>
                                    )}
                                    <p className="text-purple-600 font-semibold mt-2">
                                        {formatCurrency(selectedDish.price)}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="1"
                                max="99"
                                value={data.quantity}
                                onChange={(e) => setData('quantity', parseInt(e.target.value) || 1)}
                                placeholder="Enter quantity"
                            />
                            {errors.quantity && (
                                <p className="text-sm text-red-600">{errors.quantity}</p>
                            )}
                        </div>

                        {/* Special Instructions */}
                        <div className="space-y-2">
                            <Label htmlFor="special_instructions">
                                Special Instructions (Optional)
                            </Label>
                            <Textarea
                                id="special_instructions"
                                value={data.special_instructions}
                                onChange={(e) => setData('special_instructions', e.target.value)}
                                placeholder="Any special requests? (e.g., no onions, extra spicy)"
                                rows={3}
                            />
                            {errors.special_instructions && (
                                <p className="text-sm text-red-600">{errors.special_instructions}</p>
                            )}
                        </div>

                        {/* Order Summary */}
                        {selectedDish && (
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        Total:
                                    </span>
                                    <span className="font-bold text-purple-600 text-xl">
                                        {formatCurrency(totalPrice)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {data.quantity} × {formatCurrency(selectedDish.price)}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex gap-3">
                            <Button
                                type="submit"
                                disabled={processing || !data.dish_id}
                                className="flex-1"
                            >
                                {processing ? 'Placing Order...' : 'Place Order'}
                            </Button>
                            <Link href={`/restaurants/${restaurant.id}`}>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
