import 'dotenv/config'
import { MongoClient, Db, Collection } from 'mongodb'
const uri= process.env.MONGODB_URI
class DatabaseService {
    private client: MongoClient
    private db: Db
    constructor(){
        this.client= new MongoClient(uri as string)
        this.db=this.client.db(process.env.DB_NAME)
    }
    async connect() {
    try {
      await this.client.connect()
      await this.db.command({ ping: 1 })
      console.log(`Pinged your deployment. You successfully connected to MongoDB!`)
    } catch (err) {
      console.error("Error in connecting to database: ", err)
      throw err
    }
  }
    get tasks(): Collection<any>{
      return this.db.collection('task')
    }
    get users(): Collection<any>{
      return this.db.collection('user')
    }
    get refresh_token(): Collection<any>{
      return this.db.collection('refresh_token')
    }
}
const databaseService= new DatabaseService()
export default databaseService