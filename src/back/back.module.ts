import { Module, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@app/common';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { TagsModule } from './tags/tags.module';
import { UploadsModule } from './uploads/uploads.module';
import { FieldsModule } from './fields/fields.module';
import { LinksModule } from './links/links.module';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/databases/entity/User';
import { Repository } from 'typeorm';
import { Category } from '@app/databases/entity/Category';
import { Tags } from '@app/databases/entity/Tags';
import { Article } from '@app/databases/entity/Article';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    CategoryModule,
    ArticleModule,
    TagsModule,
    UploadsModule,
    FieldsModule,
    LinksModule,
  ],
  exports: [ArticleModule, CategoryModule, TagsModule, LinksModule],
})
export class BackModule implements OnApplicationBootstrap {
  private logger: Logger

  constructor(
    private readonly conf: ConfigService,
    @InjectRepository(User)
    private readonly Userrepo: Repository<User>,
    @InjectRepository(Category)
    private readonly Caterepo: Repository<Category>,
    @InjectRepository(Tags)
    private readonly Tagsrepo: Repository<Tags>,
    @InjectRepository(Article)
    private readonly Articlerepo: Repository<Article>,
  ) {
    this.logger = new Logger(BackModule.name);
  }

  async onApplicationBootstrap() {
    let [user, category] = [undefined, undefined];
    if (await this.Userrepo.count() === 0 && await this.Caterepo.count() === 0 && await this.Articlerepo.count() === 0) {
      this.logger.debug(`首次启动,正在初始化信息...`)
      const context = `如果您看到这篇文章,表示您的 blog 已经安装成功.`
      user = await this.Userrepo.save(this.Userrepo.create(
        {
          lastIp: "127.0.0.1",
          lastTime: new Date(),
          name: this.conf.get('WEBSITE_NAME') ?? `admin`,
          password: this.conf.get('WEBSITE_PASSWORD') ?? `admin`,
          email: this.conf.get('WEBSITE_EMAIL') ?? `admin@admin.admin`,
        }
      ))
      category = await this.Caterepo.save(this.Caterepo.create({
        label: "默认分类"
      }))
      await this.Articlerepo.save(
        this.Articlerepo.create(
          {
            title: '欢迎使用 Firstsight',
            category,
            author: user,
            html: context,
            text: context,
            summary: context,
            allowComment: true,
            isTop: false,
            type: 'article',
            tags: await this.Tagsrepo.save(this.Tagsrepo.create([{ label: "Hello" }, { label: "Firstsight" }]))
          }
        )
      )
      this.logger.debug(`初始化成功...`)
    }
  }
}
