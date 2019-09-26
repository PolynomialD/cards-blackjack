import { MongoClient } from 'mongodb'

const dbName = 'blackjack'
const url = `mongodb://root:example@localhost:27017`

export async function insert (collection: string, data: any) {
  const client = new MongoClient(url)

  try {
    await client.connect()
    console.log('Connected correctly to server')

    const db = client.db(dbName)
    const one = await db.collection(collection).insertOne(data)
    console.log(one.insertedCount)
  } catch (err) {
    console.log(err.stack)
  } finally {
    await client.close()
  }
}
// insert('gamedata', exampleGame)

export async function update (collection: string, matcher: any, data: any, upsert = false) {
  const client = new MongoClient(url)

  try {
    await client.connect()
    console.log('Connected correctly to server')

    const db = client.db(dbName)
    const col = db.collection(collection)
    const response = await col.updateMany(matcher, { $set: data }, { upsert })
    console.log(response.upsertedCount)
  } catch (err) {
    console.log(err.stack)
  } finally {
    await client.close()
  }
}
// update('updates', {someThing: 333}, {someThing: 777})

export async function get (collection: string, matcher: any): Promise<any> {
  const client = new MongoClient(url)

  try {
    await client.connect()
    console.log('Connected correctly to server')

    const db = client.db(dbName)
    const col = db.collection(collection)
    const response = await col.find(matcher).toArray()

    return response
  } catch (err) {
    console.log(err.stack)
  } finally {
    await client.close()
  }
}

// (async function () {
//   console.log(await get('updates', {someThing:777}))
// })()
