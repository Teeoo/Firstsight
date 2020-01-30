import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  constructor() {}

  public async QCLOUDCOS(data: any) {
    // 引入模块
    var COS = require('cos-nodejs-sdk-v5');
    // 创建实例
    var cos = new COS({
      SecretId: '',
      SecretKey: '',
    });
    // 分片上传
    cos.sliceUploadFile(
      {
        Bucket: 'teeoo-1251223160',
        Region: 'ap-chengdu',
        Key: data.filename + '.' + data.originalname.split('.').pop(),
        FilePath: data.path,
      },
      function(err, data) {
        return data;
      },
    );
  }

  public async ALIYUNOSS() {}

  public async QINIU() {}
}
