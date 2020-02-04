import * as React from 'react';
import styles from './FormExample.module.scss';
import { IFormExampleProps } from './IFormExampleProps';
import { SearchService } from '../../../services/searchService';

export interface IFormExampleState{
  fields: any;
}

export default class FormExample extends React.Component<IFormExampleProps, IFormExampleState> {
  public constructor(props:IFormExampleProps){
    super(props);
    this.state ={
      fields:[]
    };
  }
  private _searchService : SearchService;
  public componentWillMount(){
    this._searchService = new SearchService(this.props.context.pageContext,this.props.context.spHttpClient);
    this._searchService.getListFields('Product Details').then((data) =>{
      if(data != null ){
        data = data.filter(element => element.CanBeDeleted == true);
        console.log(data);
        console.log('filtered');
      }
      this.setState({
        fields:data
      });
    });
  }
  public render(): React.ReactElement<IFormExampleProps> {
    return (
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
            
              {this.state.fields ? this.state.fields.map((field) => {
                return <div>
                  <h3>{field.Title}</h3>
                  <p>{field.TypeAsString}</p>
                  <p>{field.EntityPropertyName}</p>
                  <p>{field.TypeDisplayName}</p>
                  </div>;
              }): ''}
             
            </div>
          </div>
        </div>
    );
  }
}
