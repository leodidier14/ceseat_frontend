import {cart_store} from '@/store/index'
import { Articles } from '@/shims-tsx';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'

@Module({name: 'cart' })
export default class Cart extends VuexModule {
    public articles: Array<Articles.Article> = [];

    public menus: Array<Articles.Menu> = [];

    @Mutation
    private ADD_ARTICLE(newArticle: Articles.Article): void {
        let previousArticle: Articles.Article = this.articles.filter(article => article.name == newArticle.name)[0];
        if (previousArticle != null) {
            previousArticle.quantity += newArticle.quantity;
        } else {
            this.articles.push(JSON.parse(JSON.stringify(newArticle)));
        }
    }

    @Mutation
    private ADD_MENU(newMenu: Articles.Menu): void {
        let previousMenu: Articles.Menu = this.menus.filter(menu => menu.name == newMenu.name)[0];
        if (previousMenu != null) {
            previousMenu.quantity += newMenu.quantity;
        } else {
            this.menus.push(JSON.parse(JSON.stringify(newMenu)));
        }
    }

    @Mutation
    private DELETE_ARTICLE(article: Articles.Article): void {
        this.articles = this.articles.filter((item: Articles.Article) => item.name != article.name);
    }

    @Mutation
    private DELETE_MENU(menu: Articles.Menu): void {
        this.menus = this.menus.filter((item: Articles.Menu) => item.name != menu.name);
    }

    @Mutation
    private INCREMENT_ARTICLE_QUANTITY(article: Articles.Article): void {
        this.articles.filter((item: Articles.Article) => item.name == article.name)[0].quantity++;
    }

    @Mutation
    private INCREMENT_MENU_QUANTITY(menu: Articles.Menu): void {
        this.menus.filter((item: Articles.Menu) => item.name == menu.name)[0].quantity++;
    }

    @Mutation
    private DECREMENT_ARTICLE_QUANTITY(article: Articles.Article): void {
        let existingArticle = this.articles.filter((item: Articles.Article) => item.name == article.name)[0];
        existingArticle.quantity == 0 ? this.DELETE_ARTICLE(article) : existingArticle.quantity--;
    }

    @Mutation
    private DECREMENT_MENU_QUANTITY(menu: Articles.Menu): void {
        let existingMenu = this.menus.filter((item: Articles.Menu) => item.name == menu.name)[0];
        existingMenu.quantity == 0 ? this.DELETE_MENU(menu) : existingMenu.quantity--;
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
    public async addMenu(newMenu: Articles.Menu): Promise<Array<Articles.Menu>> {
        await this.ADD_ARTICLE(JSON.parse(JSON.stringify(newMenu)));
        return this.menus;
    }

    @Action({rawError: true})
    public async deleteArticle(newArticle: Articles.Article): Promise<Array<Articles.Article>> {
        await this.DELETE_ARTICLE(JSON.parse(JSON.stringify(newArticle)));
        return this.articles;
    }

    @Action({rawError: true})
    public async deleteMenu(newMenu: Articles.Menu): Promise<Array<Articles.Menu>> {
        await this.DELETE_ARTICLE(JSON.parse(JSON.stringify(newMenu)));
        return this.menus;
    }

    @Action({rawError: true})
    public async incrementArticleQuantity(article: Articles.Article): Promise<Array<Articles.Article>> {
        await this.INCREMENT_ARTICLE_QUANTITY(JSON.parse(JSON.stringify(article)));
        return this.articles;
    }

    @Action({rawError: true})
    public async incrementMenuQuantity(menu: Articles.Menu): Promise<Array<Articles.Menu>> {
        await this.INCREMENT_ARTICLE_QUANTITY(JSON.parse(JSON.stringify(menu)));
        return this.menus;
    }

    @Action({rawError: true})
    public async decrementArticleQuantity(article: Articles.Article): Promise<Array<Articles.Article>> {
        if(article.quantity < 1) {
            await this.DELETE_ARTICLE(JSON.parse(JSON.stringify(article)))
        } else {
            await this.DECREMENT_ARTICLE_QUANTITY(JSON.parse(JSON.stringify(article)));
        }
        return this.articles;
    }

    @Action({rawError: true})
    public async decrementMenuQuantity(menu: Articles.Menu): Promise<Array<Articles.Menu>> {
        if(menu.quantity < 1) {
            await this.DELETE_MENU(JSON.parse(JSON.stringify(menu)))
        } else {
            await this.DECREMENT_MENU_QUANTITY(JSON.parse(JSON.stringify(menu)));
        }
        return this.menus;
    }
}
//export const CartModule = getModule(Cart)