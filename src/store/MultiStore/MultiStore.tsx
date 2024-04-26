import { makeObservable, observable, action } from 'mobx';
import { Option } from '../../components/MultiDropdown/MultiDropdown';

class MultiStore {

    tags: Option[] = []
    selectedTags: Option[] = []
    constructor() {
        makeObservable(this, {
            tags: observable,
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
                console.log(existingTag);

                if (!existingTag) {
                    temp.push({ key: top + Math.random(), value: top });
                }
            }
        }
        this.tags = temp
    }



}

export default new MultiStore();
