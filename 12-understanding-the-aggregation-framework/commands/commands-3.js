db.friends.aggregate([
    { $project: { _id: 0, examScore: { $slice: ['$examScores', 1] } } }
]).pretty()

db.friends.aggregate([
    { $project: { _id: 0, examScore: { $slice: ['$examScores', -2] } } }
]).pretty()

db.friends.aggregate([
    { $project: { _id: 0, examScore: { $slice: ['$examScores', 2, 1] } } }
]).pretty()

db.friends.aggregate([
    { $project: { _id: 0, numScores: { $size: '$examScores' } } }
]).pretty()

db.friends.aggregate([
    {
        $project: {
            _id: 0, scores: {
                $filter: {
                    input: '$examScores',
                    as: 'sc',
                    cond: {
                        $gt: ['$$sc.score', 60]
                    }
                }
            }
        }
    }
]).pretty()