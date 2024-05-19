import { makeObservable, observable, action, toJS } from 'mobx';
import { Option } from '../../components/MultiDropdown/MultiDropdown';

export class MultiStore {

    tags: Option[] = []
    selectedTags: Option[] = []
    constructor() {
        makeObservable(this, {
            selectedTags: observable.ref,
            tags: observable.ref,
            updateTags: action,
            deleteTags: action
        });
    }


    deleteTags = () => {
        this.tags = []
    }

    updateTags = (data: []) => {
        let temp: any[] = []
        for (let i = 0; i < data.length; i++) {
            const element: any = data[i];
            for (const top of element.topics) {
                const existingTag = this.tags.find(tag => tag.value === top);
                if (!existingTag) {
                    temp.push({ key: top, value: top });
                }
            }
        }

        this.tags = temp
    }



}

export default new MultiStore();