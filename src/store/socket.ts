import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule,
} from "vuex-module-decorators";
import io from "socket.io-client";

@Module({ name: "socket" })
export default class Socket extends VuexModule {

    public socket: any = null;

    @Mutation
    private CREATE_CONNECTION(): void{
        this.socket = io("http://172.16.44.43:3003")
    }

    @Action
    async createConnection(): Promise<any>{
        await this.CREATE_CONNECTION()
        return this.socket
    } 
    
}