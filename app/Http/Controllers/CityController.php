<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Cities/Index', [
            'cities' => City::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Cities/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(['name' => 'required|string|max:255|unique:cities']);
        City::create($validated);
        return redirect()->route('cities.index')->with('success', 'City created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(City $city)
    {
        return Inertia::render('Cities/Show', [
            'city' => $city,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(City $city)
    {
        return Inertia::render('Cities/Edit', [
            'city' => $city,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, City $city)
    {
        $validated = $request->validate(['name' => 'required|string|max:255|unique:cities,name,' . $city->id]);
        $city->update($validated);
        return redirect()->route('cities.index')->with('success', 'City updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(City $city)
    {
        $city->delete();
        return redirect()->route('cities.index')->with('success', 'City deleted successfully');
    }
}
