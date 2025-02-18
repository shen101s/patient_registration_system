<?php

namespace App\Http\Controllers;

use App\Models\TblPatient;
use Illuminate\Http\Request;

class TblPatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TblPatient::query();

        // Search functionality
        if ($search = $request->input('search')) {
            $query->where(function ($query) use ($search) {
                $query->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('date_of_birth', 'like', "%{$search}%")
                    ->orWhere('gender', 'like', "%{$search}%")
                    ->orWhere('contact_number', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            });
        }

        // Paginate with customizable number of entries
        $perPage = $request->input('per_page', 10); // Default to 10 entries per page
        $lists = $query->paginate($perPage);

        $filters = $request->only('page', 'search', 'per_page');

        return inertia('Patients/Index', compact('lists', 'filters'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $genders = getEnumValues('tbl_patients', 'gender');

        return inertia('Patients/Actions', compact('genders'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'date_of_birth' => ['required', 'date', 'before:today'],
            'gender' => ['required', 'string', 'in:MALE,FEMALE'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:tbl_patients,email'],
            'address' => ['required', 'string', 'max:255'],
        ]);

        TblPatient::create($validated); 
    
        return redirect()->route('patients.index')->with('success', 'Patient added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(TblPatient $tblPatient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TblPatient $res)
    {
        $genders = getEnumValues('tbl_patients', 'gender');
        
        return inertia('Patients/Actions', compact('genders', 'res'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TblPatient $tblPatient)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'date_of_birth' => ['required', 'date', 'before:today'],
            'gender' => ['required', 'string', 'in:MALE,FEMALE'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:tbl_patients,email,' . $tblPatient->id],
            'address' => ['required', 'string', 'max:255'],
        ]);

        $tblPatient->update($validated);
    
        return redirect()->route('patients.index')->with('success', 'Patient updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TblPatient $tblPatient)
    {
        try {
            $tblPatient->delete();
            return redirect()->route('patients.index')->with('success', 'Deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('patients.index')->with('error', 'Failed to delete.');
        }
    }
}
