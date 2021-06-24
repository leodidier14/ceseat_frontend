import store from '@/store'
import { Articles } from '@/shims-tsx';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'

@Module({ dynamic: true, store, name: 'cart' })
class Cart extends VuexModule {
    public articles: Array<Articles.Article> = [];

    @Mutation
    private ADD_ARTICLE(newArticle: Articles.Article): void {
        console.log("adding");
        let previousArticle: Articles.Article = this.articles.filter(article => article.name === newArticle.name)[0];
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

    get totalPrice(): number {
        let total = 0;
        this.articles.forEach((article: Articles.Article) => total += article.price*article.quantity);
        return total;
    }

    @Action({rawError: true})
    public async addArticle(newArticle: Articles.Article): Promise<Array<Articles.Article>> {
        await this.ADD_ARTICLE(newArticle);
        return this.articles;
    }

    @Action({rawError: true})
    public async deleteArticle(newArticle: Articles.Article): Promise<Array<Articles.Article>> {
        await this.DELETE_ARTICLE(newArticle);
        return this.articles;
    }
}
export const CartModule = getModule(Cart)