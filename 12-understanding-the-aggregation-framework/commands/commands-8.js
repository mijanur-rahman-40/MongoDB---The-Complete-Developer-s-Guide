db.transformedPersons.aggregate([
    {
        $geoNear: {
            near: {
                type: 'Point',
                coordinates: [-18.4, -42.8]
            },
            maxDistance: 1000000,
            $limit: 10,
            query: { age: { $gt: 30 } },
            distanceField: 'distance'
        }
    },
]).pretty()


db.transformedPersons.aggregate([
    {
        $geoNear: {
            near: {
                type: 'Point',
                coordinates: [-18.4, -42.8]
            },
            maxDistance: 1000000,
            $limit: 10,
            query: { age: { $gt: 30 } },
            distanceField: 'distance'
        }
    },
    { $project: { _id: 1, email: 0, birthdate: 0 } },
    { $sort: { distanceField: 1 } },
]).pretty()