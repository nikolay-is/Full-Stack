'use strict';

import $ from 'jquery';

class CategoryService {

    constructor(baseUrl) {
        this.url = baseUrl;
    }

    getCategories() {
        return this.getJsonAsPromise(this.url);
    }

    getCategoryById(categoryId) {
        return this.getJsonAsPromise(`${this.url}/${categoryId}`);
    }

    addNewCategory(category) {
        let url = this.url;
        delete (category._id);
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(category),
                }).done(resolve).fail(reject);
            }
        );
    }

    editCategory(category) {
        let url = this.url;
        let category_id = category._id;
        delete (category._id);
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: `${url}/${category_id}`,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(category),
                }).done(resolve).fail(reject);
            }
        );
    }

    deleteCategory(categoryId) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: `${url}/${categoryId}`,
                    dataType: 'json',
                    type: 'DELETE'
                }).done(resolve).fail(reject);
            }
        );
    }

    getJsonAsPromise(url, data) {
        return new Promise(function (resolve, reject) {
            $.getJSON(url, data).done(resolve).fail(reject);
        });
    }
}

export default CategoryService;