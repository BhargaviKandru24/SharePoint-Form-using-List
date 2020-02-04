import React from "react";
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";

export class Fields extends React.Component<any,any>{
public constructor(props:any){
    super(props);
}
private onTaxPickerChange(terms : IPickerTerms) {
    console.log("Terms", terms);
}
public render(){
    return <div>
       <TaxonomyPicker allowMultipleSelections={true}
                termsetNameOrID="Countries"
                panelTitle="Select Term"
                label="Taxonomy Picker"
                context={this.props.context}
                onChange={this.onTaxPickerChange}
                isTermSetSelectable={false} />
    </div>;

}
}