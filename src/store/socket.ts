import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule,
} from "vuex-module-decorators";

@Module({ name: "socket" })
export default class Socket extends VuexModule {

    private socket: any = {};

    @Mutation
    private CREATE_CONNECTION(): void{
        
    }

    @Action
    async createConnection(): Promise<any>{

    } 
    
}