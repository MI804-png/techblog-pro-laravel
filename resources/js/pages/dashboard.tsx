import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

interface DashboardProps {
    userStats: {
        total_restaurants: number;
        total_dishes: number;
        user_orders: number;
        user_messages: number;
    };
    recentRestaurants: Array<{
        id: number;
        name: string;
        cuisine_type: string;
        rating: number;
        dishes: Array<{
            id: number;
            name: string;
            price: number;
        }>;
    }>;
    recentOrders: Array<{
        id: number;
        quantity: number;
        total_price: number;
        created_at: string;
        restaurant: {
            name: string;
        };
        dish: {
            name: string;
        };
    }>;
    popularRestaurants: Array<{
        id: number;
        name: string;
        cuisine_type: string;
        rating: number;
        dishes_count: number;
    }>;
    user: {
        name: string;
        email: string;
        role: string;
    };
}

export default function Dashboard({
    userStats,
    recentRestaurants,
    recentOrders,
    popularRestaurants,
    user
}: DashboardProps) {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-8">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Welcome back, {user.name}!
                            </h3>
                            <p className="text-gray-600">
                                Here's what's happening with Restaurant Hub today.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-blue-100 text-sm">Total Restaurants</p>
                                    <p className="text-3xl font-bold">{userStats.total_restaurants}</p>
                                </div>
                                <div className="text-4xl text-blue-200">🏪</div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-green-100 text-sm">Available Dishes</p>
                                    <p className="text-3xl font-bold">{userStats.total_dishes}</p>
                                </div>
                                <div className="text-4xl text-green-200">🍽️</div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-purple-100 text-sm">Your Orders</p>
                                    <p className="text-3xl font-bold">{userStats.user_orders}</p>
                                </div>
                                <div className="text-4xl text-purple-200">📦</div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-orange-100 text-sm">Your Messages</p>
                                    <p className="text-3xl font-bold">{userStats.user_messages}</p>
                                </div>
                                <div className="text-4xl text-orange-200">💬</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Restaurants */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-900">
                                    Latest Restaurants
                                </h4>
                            </div>
                            <div className="p-6">
                                {recentRestaurants.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentRestaurants.map((restaurant) => (
                                            <div key={restaurant.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                                <div>
                                                    <h5 className="font-semibold text-gray-900">
                                                        {restaurant.name}
                                                    </h5>
                                                    <p className="text-sm text-gray-600">
                                                        {restaurant.cuisine_type} • ⭐ {restaurant.rating}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {restaurant.dishes.length} dishes available
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/restaurants/${restaurant.id}`}
                                                    className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No restaurants available</p>
                                )}
                            </div>
                        </div>

                        {/* Popular Restaurants */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-900">
                                    Popular Restaurants
                                </h4>
                            </div>
                            <div className="p-6">
                                {popularRestaurants.length > 0 ? (
                                    <div className="space-y-4">
                                        {popularRestaurants.map((restaurant) => (
                                            <div key={restaurant.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                                <div>
                                                    <h5 className="font-semibold text-gray-900">
                                                        {restaurant.name}
                                                    </h5>
                                                    <p className="text-sm text-gray-600">
                                                        {restaurant.cuisine_type} • ⭐ {restaurant.rating}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {restaurant.dishes_count} dishes
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/restaurants/${restaurant.id}`}
                                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                                >
                                                    Explore
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No restaurants available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 bg-white overflow-hidden shadow-lg rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-900">
                                Quick Actions
                            </h4>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Link
                                    href="/restaurants"
                                    className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
                                >
                                    <div className="text-center w-full">
                                        <div className="text-2xl mb-2">🏪</div>
                                        <p className="font-medium text-gray-900">Browse Restaurants</p>
                                    </div>
                                </Link>
                                
                                <Link
                                    href="/contact"
                                    className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
                                >
                                    <div className="text-center w-full">
                                        <div className="text-2xl mb-2">📞</div>
                                        <p className="font-medium text-gray-900">Contact Us</p>
                                    </div>
                                </Link>
                                
                                <Link
                                    href="/messages"
                                    className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                                >
                                    <div className="text-center w-full">
                                        <div className="text-2xl mb-2">💬</div>
                                        <p className="font-medium text-gray-900">My Messages</p>
                                    </div>
                                </Link>
                                
                                <Link
                                    href="/graphs"
                                    className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition"
                                >
                                    <div className="text-center w-full">
                                        <div className="text-2xl mb-2">📊</div>
                                        <p className="font-medium text-gray-900">View Analytics</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
