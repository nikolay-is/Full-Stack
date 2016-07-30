'use strict';

import $ from 'jquery';

class AdService {

    constructor(baseUrl) {
        this.url = baseUrl;
    }
    getAds() {
        return this.getJsonAsPromise(this.url);
    }

    getAdById(adId) {
        return this.getJsonAsPromise(`${this.url}/${adId}`);
    }

    addNewAd(ad) {
        let url = this.url;
        delete (ad._id);
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(ad),
                }).done(resolve).fail(reject);
            }
        );
    }

    editAd(ad) {
        let url = this.url;
        let ad_id = ad._id;
        delete (ad._id);
        delete (ad.validityDate);
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: `${url}/${ad_id}`,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(ad),
                }).done(resolve).fail(reject);
            }
        );
    }

    deleteAd(adId) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: `${url}/${adId}`,
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

export default AdService;