import mongoose from 'mongoose'

const numberSchema = new mongoose.Schema({

    // results:[

    // ],
    // file:{
    //    info:{ 
    //        type:'String',
    //        trim:true,
    //     },
    //     caseNumber: {
    //         type: 'String',
    //         trim: true,
    //     },
    //     Date: {
    //         type: 'String',
    //         trim: true,
    //     },
    // },

    caller_name: {
        type: String,
        trim: true,
        //required:[true,'Please provide caller name'],
        //minlength:3,
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    caller_type: {
        type: String,
        trim: true,
        //required:[true,'Please provide caller type'],
        //minlength:3,
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    operating_company_name: {
        type: String,
        trim: true,
        //required:[true,'Please provide carrier_name'],
        //minlength:3,
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    line_type: {
        type: String,
        trim: true,
        //required:[true,'Please provide carrier_name'],
        //minlength:3,
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    locality: {
        type: String,
        trim: true,
        //required:[true,'Please provide description'],
        //minlength:10,
        maxlength: [300, 'Name cannot be more than 300 characters'],
    },
    postal_code: {
        type: Number,
        //required:[true,'Please provide postal_code'],
    },
    neighborhood: {
        type: String,
        trim: true,
        //required:[true,'Please provide neighborhood'],
    },
    sub_region: {
        type: String,
        trim: true,
        //required:[true,'Please provide sub_region'],
    },
    risk_rating: {
        type: String,
        //required:[true,'Please provide risk_rating'],
    },
    risk_level: {
        type: Number,
        //required:[true,'Please provide risk_level'],
        default: 0,
    },
    ocn: {
        type: String,
    },
    administrative_area_level_2: {
        type: String,
        //required:[true,'Please provide administrative_area'],
    },
    phoneNumber: {
        type: String,
    },
    score: {
        type: Number,
    },
    country_short: {
        type: String,
        trim: true,
    },

    timezone: {
        type: String,
        trim: true,
    },

    timezone_short: {
        type: String,
        trim: true,
    },

    operating_company_type: {
        type: String,
        trim: true,
    },

    ported: {
        type: Boolean,
    },

    lata: {
        type: String,
        trim: true,
    },

    dialcode_impossible: {
        type: String,
        trim: true,
    },

    location_routing_number: {
        type: String,
        trim: true,
    },

    ported_date: {
        type: String,
        trim: true,
    },

    clli: {
        type: String,
        trim: true,
    },

    timezone_utc_offset: {
        type: String,
        trim: true,
    },

    sublocality_level_1: {
        type: String,
        trim: true,
    },

    dialcode_invalid: {
        type: String,
        trim: true,
    },

    switch_assignment_date: {
        type: String,
        trim: true,
    },

    administrative_area_level_1_short: {
        type: String,
        trim: true,
    },

    country: {
        type: String,
        trim: true,
    },

    region: {
        type: String,
        trim: true,
    },

    administrative_area_level_3: {
        type: String,
        trim: true,
    },

    administrative_area_level_1: {
        type: String,
        trim: true,
    },

    point_of_interest: {
        type: String,
        trim: true,
    },

},
    {
        timestamps: true,
    }
);



export default mongoose.model('Number', numberSchema)