import 'dotenv/config'
import { MongoClient, Db, Collection } from 'mongodb'

class DatabaseService {
    private client: MongoClient
    private db: Db

    constructor(){
        const uri = process.env.MONGODB_URI || "mongodb://mongo:27017/todox"
        const dbName = process.env.DB_NAME || "todox"
        
        const cleanUri = uri.replace(/^"|"$/g, '').trim()
        
        console.log("Đang thử kết nối MongoDB tới URI:", cleanUri)

        this.client = new MongoClient(cleanUri)
        this.db = this.client.db(dbName)
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

const databaseService = new DatabaseService()
export default databaseService