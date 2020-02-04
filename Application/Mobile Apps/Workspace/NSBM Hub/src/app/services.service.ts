import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class ServicesService {
  constructor(private _httpClient: HttpClient) {}

  getActivity(activityID: String) {
    return this._httpClient.get(API + "/id/" + activityID);
  }

  getAllActivities() {
    return this._httpClient.get(API);
  }
}

const API = "";