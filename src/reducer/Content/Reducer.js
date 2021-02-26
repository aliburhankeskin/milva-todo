import * as $AT from '../ActionTypes';
import { INITIAL_STATE } from './Store';

const ContentReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case $AT.GET_CATEGORY: {

            const categories =
                [
                    {
                        id: 1,
                        name: 'Kategori 1',
                        count: 20
                    },
                    {
                        id: 2,
                        name: 'Kategori 2',
                        count: 12
                    },
                    {
                        id: 3,
                        name: 'Kategori 3',
                        count: 55
                    },

                    {
                        id: 4,
                        name: 'Kategori 4',
                        count: 0
                    },
                ]

            // Api isteği olacak
            return { ...state, categories };
        }

        case $AT.ADD_CATEGORY: {
            // Api isteği
            const lastId = state.categories[state.categories.length - 1].id;
            const category = {
                id: lastId + 1,
                name: payload,
                count: 0
            }
            return { ...state, categories: [...state.categories, category] };
        }

        case $AT.DELETE_CATEGORY: {
            const categories = state.categories.filter(c => c.id !== payload);
            return { ...state, categories };
        }

        case $AT.UPDATE_LIST: {

            if (Number(payload) === -2) {
                const contentList = state.tempContentList.filter(c => c.isFav === true);
                const selectedCategory = {
                    name: 'Favoriler',
                    count: contentList.length
                }
                return { ...state, contentList, selectedCategory };
            } else {


                const selectedCategory = state.categories.find(c => c.id === Number(payload));

                const contentList = state.tempContentList.filter(c => c.categoryId === Number(payload));
                return { ...state, contentList, selectedCategory };
            }

        }

        case $AT.ADD_LIST_ITEM: {
            const categoryId = state.selectedCategory.id;
            const lastTaskId = state.contentList[state.contentList.length - 1].id;
            const task = {
                id: lastTaskId + 1,
                categoryId: categoryId,
                content: payload
            }

            return { ...state, contentList: [...state.contentList, task] };
        }

        case $AT.DELETE_LIST_ITEM: {
            const contentList = state.contentList.filter(c => c.id !== payload);
            return { ...state, contentList };
        }

        case $AT.FAV_LIST_ITEM: {
            const newContent = [...state.contentList];
            const index = state.contentList.findIndex(c => c.id === payload);
            newContent[index].isFav = !newContent[index].isFav;
            return { ...state, contentList: newContent }
        }

        default: return state;
    }
};
export default ContentReducer;
