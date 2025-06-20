
export class ratelimitCache{
    private static memory =  new Map<string , {count : number , expiry : number}>();

    static setIP(key : string , value : number , window : number){
        const expiry = Date.now() + window * 1000;
        this.memory.set(key ,{count : value , expiry})
    }

    static getIP(key : string){
        const data = this.memory.get(key)
        if (!data) return 0;

        if (Date.now() > data.expiry){
            this.memory.delete(key)
            return 0;
        }
        return data.count
    }

    static incrementIP(key : string, window : number){
        this.cleanUp()
        const data = this.memory.get(key)
        if (!data || Date.now() > data.expiry){
            this.setIP(key ,1 ,window)
        }
        else{
            this.memory.set(key , {count : data.count+1 , expiry : data.expiry})
        }
    }

    static cleanUp(){
        const now = Date.now()
        this.memory.forEach((value, key)=>{
            if (value.expiry < now){
                this.memory.delete(key)
            }
        })
    }
}