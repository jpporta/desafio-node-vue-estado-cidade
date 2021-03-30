import redis, { RedisClient } from 'redis'

class Cache {
  private static instance: redis.RedisClient | undefined = undefined
  private static running: boolean = false
  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = redis.createClient({
      host: 'localhost',
      port: 6379,
      password: 'meaprovazoox'
    })

    this.instance.on('error', (err) => console.log(err))
    this.instance.on('ready', () => this.running = true)

    return this.instance
  }

  static async get(key: string) {
    const redisInstance = this.getInstance();
    if (!this.running) return null
    const response: string | null = await new Promise((resolve, reject) => {
      redisInstance.get(key, (err, reply) => {
        if (err) reject(err)
        resolve(reply)
      })
    })
    return response ? JSON.parse(response) : null
  }

  static async set(key: string, value: any, expiration: number) {
    const redisInstance = this.getInstance();
    if (!this.running) return
    await new Promise((resolve, reject) => {
      redisInstance.set(key, JSON.stringify(value), 'EX', expiration, (err, reply) => {
        if (err) reject(err)
        resolve(reply)
      })
    })
  }

  static async delete(key: string) {
    const redisInstance = this.getInstance();
    if (!this.running) return
    await new Promise((resolve, reject) => {
      redisInstance.del(key, (err, reply) => {
        if (err) reject(err)
        resolve(reply)
      })
    })
  }
}

export { Cache }