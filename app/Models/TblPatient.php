<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TblPatient extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    public function toArray()
    {
        $array = parent::toArray();

        $array['created_at'] = Carbon::parse($this->created_at)->format('m/d/Y H:i:s');
        $array['updated_at'] = Carbon::parse($this->updated_at)->format('m/d/Y H:i:s');

        return $array;
    }
    
}
