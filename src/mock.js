import Mock from 'mockjs';
import apis from './api/apis'
const Random = Mock.Random;

// mock一组数据

let mocks = {
  mockDashLinks() {
    return {
      "data": [
        {
          "comment": "Mock书签",
          "createTime": "2019-08-27T06:37:57.282Z",
          "delete": false,
          "folderId": 0,
          "icon": "string",
          "id": 0,
          "lastSeen": "2019-08-27T06:37:57.282Z",
          "name": "string",
          "sortIndex": 0,
          "thumbnail": "string",
          "title": "string",
          "updateTime": "2019-08-27T06:37:57.282Z",
          "url": "string",
          "userId": 0,
          "visitedCount": 0
        }
      ],
      "message": "",
      "status": 200
    }
  },
  removeDashLink() {
    return {
      "data": "",
      "message": "",
      "status": 200
    }
  },
  getAllFolders() {
    return {
      "data": [{
        "childs": [],
        "code": "DEFAULT",
        "folder": true,
        "id": 1,
        "name": "未归档",
        "system": true
      },{
        "childs": [],
        "code": "TRASH",
        "folder": true,
        "id": 2,
        "name": "回收站",
        "system": true
      }],
      "message": "",
      "status": 200
    }
  }
};


Mock.mock(apis.baseHost + '/link-service/api/tag/1/link', mocks.mockDashLinks);
Mock.mock(apis.baseHost + '/link-service/api/link/0/removeFromDash', mocks.removeDashLink);
Mock.mock(apis.baseHost + '/link-service/api/folder/current', mocks.getAllFolders);

