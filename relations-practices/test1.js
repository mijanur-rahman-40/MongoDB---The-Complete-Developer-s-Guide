
use db_relations

    > db.users.insertOne({ userName: 'admin', email: 'admin@gmail.com', userId: 'AD' })

    > db.userInfo.insertOne({ userId: 'AD', phone: "0345284" })


    > db.userrole.insertOne({ userId: 'AD', role: 'admin' })

db.users.aggregate(
    [
        {
            $lookup: {
                from: 'userInfo',
                localField: 'userId',
                foreignField: 'userId',
                as: 'user_info'
            }
        },
        {
            $unwind: '$user_info'
        },
        {
            $lookup: {
                from: "userrole",
                localField: "userId",
                foreignField: "userId",
                as: "user_role"
            }
        },
        {
            $unwind: "$user_role"
        },
        {
            $match: {
                $and: [
                    {
                        'userName': 'admin'
                    }
                ]
            }
        },
        {
            $project: {
                _id: 1,
                email: 1,
                userName: 1,
                userPhone: '$user_info.phone',
                role: "$user_role.role"
            }
        }
    ]
).pretty()


use bookStore

// authors table
/*
{
    "_id" : ObjectId("5f60dc110a866a0a53c4cfe7"),
    "name" : "Mijanur",
    "age" : 29.0,
    "address" : {
        "street" : "Sajborkhilla"
    }
}

{
    "_id" : ObjectId("5f60dc110a866a0a53c4cfe8"),
    "name" : "Raju",
    "age" : 19.0,
    "address" : {
        "street" : "Bowla"
    }
}
*/

// books table
/*
{
    "_id" : ObjectId("5f60e3a40a866a0a53c4cfeb"),
    "name" : "Grammer book",
    "authorsId" : ObjectId("5f60dc110a866a0a53c4cfe7"),
    "publisherId" : ObjectId("5f60e2db0a866a0a53c4cfe9")
}
*/

// publishers table
/*
{
    "_id" : ObjectId("5f60e2db0a866a0a53c4cfe9"),
    "name" : "Punjeri",
    "address" : "12 road, Mirpur"
}
{
    "_id" : ObjectId("5f60e2db0a866a0a53c4cfea"),
    "name" : "Anupom",
    "address" : "24 Avenue, Gazipur"
}
*/

db.publishers.aggregate([
    {
        $lookup: {
            from: 'books',
            localField: "_id",
            foreignField: 'publisherId',
            as: 'books_info'
        },
    },
    {
        $unwind: '$books_info'
    },
    {
        $project: {
            _id: 1,
            name: 1,
            address: 1,
            books_name: '$books_info.name'
        }
    }

]).pretty()


// here 1 -> condition true -> matched

db.publishers.aggregate([
    {
        $lookup: {
            from: 'books',
            localField: "_id",
            foreignField: 'publisherId',
            as: 'books_info'
        },
    },
    {
        $unwind: '$books_info'
    },
    {
        $project: {
            _id: 1,
            name: 1,
            address: 1,
            books_name: '$books_info.name',
            mid: {
                $cond: [
                    { $eq: ['$books_info.authorsId', ObjectId("5f60dc110a866a0a53c4cfe9")], }, 1, 0
                ]
            }
        }
    },
    {
        $match: {
            mid: 1
        }
    }
]).pretty()
