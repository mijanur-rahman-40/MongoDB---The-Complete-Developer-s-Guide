// data
{
    "_id" : ObjectId("5f4d12b0bdef91d4c0c7a678"),
        "reservationInfo" : [
            {
                "date": "2/4/2020",
                "shift": [
                    "M",
                    "A",
                    "E"
                ],
                "alreadyBooked": []
            },
            {
                "date": "5/11/2020",
                "shift": [
                    "A",
                    "E"
                ],
                "alreadyBooked": [
                    "E"
                ]
            }
        ],
            "description" : {
        "name" : "Basundara City Convention Hall",
            "city" : "Dhaka",
                "district" : "Dhaka",
                    "contactInfo" : "222",
                        "streetName" : "22",
                            "streetNo" : "8 no Garpar Lane"
    }
}

{
    "_id" : ObjectId("5f4d13efbdef91d4c0c7a679"),
        "reservationInfo" : [
            {
                "date": "6/8/2020",
                "shift": [
                    "M",
                    "A",
                    "E"
                ],
                "alreadyBooked": [
                    "A"
                ]
            },
            {
                "date": "5/11/2020",
                "shift": [
                    "A",
                    "E"
                ],
                "alreadyBooked": [
                    "E"
                ]
            }
        ],
            "description" : {
        "name" : "Jamuna Future Park",
            "city" : "Dhaka",
                "district" : "Dhaka",
                    "contactInfo" : "0195644568",
                        "streetName" : "22, no address",
                            "streetNo" : "89, avenue rode"
    }
}

db.reservationData.find({
    $and:
        [
            {
                $or: [
                    { 'description.name': 'Basundara City Convention Hall' },
                    { 'description.city': 'Basundara City Convention Hall' }
                ]
            },
            {
                reservationInfo: {
                    $all: [
                        {
                            $elemMatch: {
                                date: '2/4/2020',
                                shift: { $all: ['M', 'E'] },
                                alreadyBooked: { $nin: ['M', 'E'] }
                            },
                        }, {
                            $elemMatch: {
                                date: '5/11/2020',
                                shift: { $all: ['A', 'E', 'M'] },
                                alreadyBooked: { $nin: ['A', 'E', 'M'] }
                            }
                        }
                    ]
                }
            }
        ]
}).pretty()

db.reservationData.update(
    {
        "_id": ObjectId("5f4d12b0bdef91d4c0c7a678"),

    },
    {
        $push: { $and: [{ date: '5/11/2020' }, { 'reservationInfo.$[].alreadyBooked': { $each: ['A'] } }] },
    }
)

db.reservationData.update(
    {
        "_id": ObjectId("5f4d12b0bdef91d4c0c7a678"),
        reservationInfo: {
            $elemMatch: {
                date: '6/11/2020',
                alreadyBooked: { $nin: ['A'] }
            }
        }
    },
    {
        $push: { 'reservationInfo.$.alreadyBooked': { $each: ['A'] } },
    }
)


db.reservationData.update({
    "_id": ObjectId("5f4d12b0bdef91d4c0c7a678"),

    reservationInfo: {
        $all: [
            {
                $elemMatch: {
                    date: '5/11/2020',
                    alreadyBooked: { $nin: ['A'] }
                }
            },
            {
                $elemMatch: {
                    date: '2/4/2020',
                    alreadyBooked: { $nin: ['E'] }
                }
            }
        ]
    }
},
    {
        $push: { 'reservationInfo.$[0].alreadyBooked': { $each: ['A'] } },
        $push: { 'reservationInfo.$[1].alreadyBooked': { $each: ['E'] } },
    }
    , {
        multi: true
    }
)

db.reservationData.update(
    {
        "_id": ObjectId("5f4d12b0bdef91d4c0c7a678"),
        reservationInfo: {
            $elemMatch: {
                date: '2/4/2020'
            },
        }
    },
    {
        $pull: { 'reservationInfo.$.alreadyBooked': { $in: ['A', 'E'] } },
    }
)


