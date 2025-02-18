<?php 
    use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\matches;

    if (!function_exists('getEnumValues')) {
        function getEnumValues(string $table, string $column): array
        {
            // Fetch the column details using SHOW COLUMNS
            $result = DB::select("SHOW COLUMNS FROM {$table} WHERE Field = ?", [$column]);
    
            if (empty($result)) {
                return []; // Return an empty array if the column does not exist
            }
    
            $type = $result[0]->Type; // Extract the type information
    
            // Extract ENUM values using regex
            preg_match('/^enum\((.*)\)$/', $type, $matches);
    
            if (!isset($matches[1])) {
                return []; // Return an empty array if no ENUM values are found
            }
    
            // Split the ENUM values and trim quotes
            return array_map(function ($value) {
                return [
                    'value' => trim($value, "'"),
                    'label' => trim($value, "'")
                ];
            }, explode(',', $matches[1]));
        }
    }

    