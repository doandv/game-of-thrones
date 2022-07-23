import axios from 'axios'
import { API_BOOKS_URL, API_DOMAIN_URL, API_CHARACTERS_URL, API_HOUSES_URL } from '../constants';
import { BookFilterModel, BookResponseModel, CharacterFilterModel, CharacterResponseModel, HouseFilterModel, HouseResponseModel } from '../model';

export async function fetchBookData(filterModel:BookFilterModel):Promise<BookResponseModel> {
    let apiUrl = `${API_DOMAIN_URL}${API_BOOKS_URL}`;
    if(filterModel.page) {
        apiUrl += `?page=${filterModel.page}`;
    }
    if(filterModel.paseSize) {
        apiUrl += `&paseSize=${filterModel.paseSize}`;
    }
    if(filterModel.name) {
        apiUrl += `&name=${filterModel.name}`
    }
    if(filterModel.fromReleaseDate) {
        apiUrl += `&fromReleaseDate=${filterModel.fromReleaseDate}`
    }
    if(filterModel.toReleaseDate) {
        apiUrl += `&fromReleaseDate=${filterModel.toReleaseDate}`
    }
    return await axios.get(apiUrl);
}

export async function fetchCharacterData(filterModel:CharacterFilterModel):Promise<CharacterResponseModel> {
    let apiUrl = `${API_DOMAIN_URL}${API_CHARACTERS_URL}`;
    let page = filterModel.name ? filterModel.page : 2;

    if(page) {
        apiUrl += `?page=${page}`;
    }
    if(filterModel.paseSize) {
        apiUrl += `&paseSize=${filterModel.paseSize}`;
    }
    if(filterModel.name) {
        apiUrl += `&name=${filterModel.name}`
    }
    if(filterModel.gender) {
        apiUrl += `&gender=${filterModel.gender}`
    }
    if(filterModel.culture) {
        apiUrl += `&culture=${filterModel.culture}`
    }
    if(filterModel.isAlive) {
        apiUrl += `&isAlive=${filterModel.isAlive}`
    }
    return await axios.get(apiUrl);
}

export async function fetchHouseData(filterModel:HouseFilterModel):Promise<HouseResponseModel> {
    let apiUrl = `${API_DOMAIN_URL}${API_HOUSES_URL}`;
    if(filterModel.page) {
        apiUrl += `?page=${filterModel.page}`;
    }
    if(filterModel.paseSize) {
        apiUrl += `&paseSize=${filterModel.paseSize}`;
    }
    if(filterModel.name) {
        apiUrl += `&name=${filterModel.name}`
    }
    if(filterModel.region) {
        apiUrl += `&region=${filterModel.region}`
    }
    if(filterModel.words) {
        apiUrl += `&words=${filterModel.words}`
    }
   // apiUrl += `&hasTitles=${filterModel.hasTitles}`
    return await axios.get(apiUrl);
}