import { Injectable } from '@angular/core';
import axios from 'axios';
import { PopupService } from './popup.service';

export interface NewsItem {
  title: string;
  description: string;
  source: string;
  author:string;
  url:string;
  // Adicione outras propriedades conforme necessário
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = '1390c571896e41e8b0f500056c86cab0';  // Substitua pela sua chave da NewsAPI
  private apiUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private popupService: PopupService) { }

  async getNews(): Promise<NewsItem[]> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          country: 'pt',
          apiKey: this.apiKey
        }
      });
      return response.data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        source: article.source.name,
        author:article.author,
        url:article.url

      }));
    } catch (error) {
      this.popupService.show('Erro ao carregar notícias. Por favor, tente novamente mais tarde.');
      return [];
    }
  }
}
