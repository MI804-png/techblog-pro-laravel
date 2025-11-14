<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Restaurant;
use App\Models\Dish;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of user's orders.
     */
    public function index()
    {
        $orders = Order::with(['restaurant', 'dish'])
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Show the form for creating a new order.
     */
    public function create(Request $request)
    {
        $restaurantId = $request->query('restaurant');
        $restaurant = Restaurant::with('dishes')->findOrFail($restaurantId);

        return Inertia::render('orders/create', [
            'restaurant' => $restaurant,
            'dishes' => $restaurant->dishes()->where('is_available', true)->get()
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'dish_id' => 'required|exists:dishes,id',
            'quantity' => 'required|integer|min:1',
            'special_instructions' => 'nullable|string|max:500',
        ]);

        // Get the dish to calculate total price
        $dish = Dish::findOrFail($validated['dish_id']);
        $totalPrice = $dish->price * $validated['quantity'];

        $order = Order::create([
            'user_id' => auth()->id(),
            'restaurant_id' => $validated['restaurant_id'],
            'dish_id' => $validated['dish_id'],
            'quantity' => $validated['quantity'],
            'total_price' => $totalPrice,
            'status' => 'pending',
            'special_instructions' => $validated['special_instructions'] ?? null,
            'order_date' => now(),
        ]);

        return redirect()->route('orders.index')
            ->with('success', 'Order placed successfully! Total: $' . number_format($totalPrice, 2));
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        // Ensure user can only view their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load(['restaurant', 'dish', 'user']);

        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }

    /**
     * Cancel an order.
     */
    public function cancel(Order $order)
    {
        // Ensure user can only cancel their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        // Only pending orders can be cancelled
        if ($order->status !== 'pending') {
            return back()->with('error', 'Only pending orders can be cancelled.');
        }

        $order->update(['status' => 'cancelled']);

        return redirect()->route('orders.index')
            ->with('success', 'Order cancelled successfully.');
    }
}
