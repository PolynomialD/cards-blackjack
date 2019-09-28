import { MongoClient } from 'mongodb'
import { game } from '../types/gametypes'

const dbName = 'blackjack'
const url = `mongodb://root:example@localhost:27017`

export async function insert (collection: string, data: any) {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client.connect()
    const db = client.db(dbName)
    await db.collection(collection).insertOne(data)
  } catch (err) {
    console.log(err.stack)
  } finally {
    await client.close()
  }
}
// insert('gamedata', exampleGame)

export async function update (collection: string, matcher: any, data: any, upsert = false) {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client.connect()
    const db = client.db(dbName)
    const col = db.collection(collection)
    await col.updateMany(matcher, { $set: data }, { upsert })
  } catch (err) {
    console.log(err.stack)
  } finally {
    await client.close()
  }
}
// update('updates', {someThing: 333}, {someThing: 777})

export async function get (collection: string, matcher: any): Promise<any> {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client.connect()
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

export async function getGame (gameId: string): Promise<any> {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client.connect()
    const db = client.db(dbName)
    const col = db.collection('gamedata')
    const response = await col.findOne({ id: gameId }) as game

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
