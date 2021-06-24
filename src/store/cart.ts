import {cart_store} from '@/store/index'
import { Articles } from '@/shims-tsx';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'

@Module({name: 'cart' })
export default class Cart extends VuexModule {
    public articles: Array<Articles.Article> = [];

    @Mutation
    private ADD_ARTICLE(newArticle: Articles.Article): void {
        console.log("adding");
        let previousArticle: Articles.Article = this.articles.filter(article => article.name == newArticle.name)[0];
        if (previousArticle != null) {
            previousArticle.quantity += newArticle.quantity;
        } else {
            this.articles.push(JSON.parse(JSON.stringify(newArticle)));
        }
    }

    @Mutation
    private DELETE_ARTICLE(article: Articles.Article): void {
        this.articles = this.articles.filter((item: Articles.Article) => item.name != article.name);
    }

    @Mutation
    private INCREMENT_QUANTITY(article: Articles.Article): void {
        this.articles.filter((item: Articles.Article) => item.name == article.name)[0].quantity++;
    }

    @Mutation
    private DECREMENT_QUANTITY(article: Articles.Article): void {
        let existingArticle = this.articles.filter((item: Articles.Article) => item.name == article.name)[0];
        existingArticle.quantity == 0 ? this.DELETE_ARTICLE(article) : existingArticle.quantity--;
    }

    get totalPrice(): number {
        let total = 0;
        this.articles.forEach((article: Articles.Article) => total += article.price*article.quantity);
        return total;
    }

    get restaurant(): string {
        if(this.articles.length > 0) {
            return this.articles[0].restaurant;
        } else {
            return "";
        }
    }

    @Action({rawError: true})
    public async addArticle(newArticle: Articles.Article): Promise<Array<Articles.Article>> {
        await this.ADD_ARTICLE(JSON.parse(JSON.stringify(newArticle)));
        return this.articles;
    }

    @Action({rawError: true})
    public async deleteArticle(newArticle: Articles.Article): Promise<Array<Articles.Article>> {
        await this.DELETE_ARTICLE(JSON.parse(JSON.stringify(newArticle)));
        return this.articles;
    }

    @Action({rawError: true})
    public async incrementQuantity(article: Articles.Article): Promise<Array<Articles.Article>> {
        await this.INCREMENT_QUANTITY(JSON.parse(JSON.stringify(article)));
        return this.articles;
    }

    @Action({rawError: true})
    public async decrementQuantity(article: Articles.Article): Promise<Array<Articles.Article>> {
        if(article.quantity < 1) {
            await this.DELETE_ARTICLE(JSON.parse(JSON.stringify(article)))
        } else {
            await this.DECREMENT_QUANTITY(JSON.parse(JSON.stringify(article)));
        }
        return this.articles;
    }
}
//export const CartModule = getModule(Cart)