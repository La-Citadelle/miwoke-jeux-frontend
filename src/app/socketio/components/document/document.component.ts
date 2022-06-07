import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DocumentService } from '../../services/document.service';
import { Document } from "../../models/document";
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {

  document: Document;
  private _docSub: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this._docSub = this.documentService.currentDocument.pipe(
      startWith({ id: '', doc: 'Select an existing document or create a new one to get started' })
    ).subscribe(document => this.document = document);
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  editDoc() {
    this.documentService.editDocument(this.document);
  }
}
