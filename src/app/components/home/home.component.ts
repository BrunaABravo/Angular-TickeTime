import { Component, OnInit } from '@angular/core';
import { NewsService, NewsItem } from '../../services/news.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  messages = [
    {
      title: 'Mensagem de Luís Moutinho',
      content: `Caros colegas,

      A MC anunciou os seus resultados do primeiro trimestre de 2024, com um crescimento de 9,4% face ao mesmo período do ano anterior, totalizando 1,6 mil milhões de euros. O Continente ganhou quota de mercado e os negócios de saúde e beleza continuaram a crescer fortemente. Estes resultados refletem o compromisso das nossas equipas com a excelência e a inovação contínua. 

      Um abraço,
      Luís Moutinho
      CEO MC`
    },
  ];

  news: NewsItem[] = [];

  constructor(private newsService: NewsService, private popupService: PopupService) { }

  async ngOnInit() {
    try {
      this.news = await this.newsService.getNews();
    } catch (error) {
      this.popupService.show('Erro ao carregar notícias. Por favor, tente novamente mais tarde.');
    }
  }
}
