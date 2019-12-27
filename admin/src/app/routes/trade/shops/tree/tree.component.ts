import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/core';

@Component({
    selector: 'nz-tree-dynamic',
    templateUrl: './tree.component.html'
})
export class TradeShopsTreeComponent implements OnInit {

    nodes = [
        { title: 'Expand to load', key: '0' },
        { title: 'Expand to load', key: '1' },
        { title: 'Tree Node', key: '2', isLeaf: true }
    ];
    data: any;
    area: any;
    recommend: any;
    itemId: any;

    constructor(
        private modal: NzModalRef,
        public msgSrv: NzMessageService,
        public http: _HttpClient,
        private modalHelper: ModalHelper
    ) { }


    ngOnInit(): void {
        this.http.get(ROOT_URL + 'shop/message/getChildShopMessage', { shopid: this.itemId }).subscribe(res => {

            if (res['code'] == 0) {

                let list = res['data'].child;

                let levelList1 = [];
                let levelList2 = [];
                list.forEach(item => {
                    // recommmend_type: "地区推荐"
                    if (item.recommmend_type == '地区推荐') {
                        levelList1.push({
                            title: item.shopname + '--' + item.username,
                            key: String(item.id)
                        })
                    } else {
                        levelList2.push({
                            title: item.shopname + '--' + item.username,
                            key: String(item.id)
                        })
                    }
                })

                console.log(levelList1, levelList2)
                this.area = levelList1
                this.recommend = levelList2
                this.data = true;
            }
            // this.record
        });
    }


    close() {
        this.modal.destroy();
    }

    nzEvent(event: Required<NzFormatEmitEvent>): void {
        console.log(event);
        // load child async
        if (event.eventName === 'expand') {
            const node = event.node;
            console.log(node.key)
            if (node && node.getChildren().length === 0 && node.isExpanded) {

                this.http.get(ROOT_URL + 'shop/message/getChildShopMessage', { shopid: node.key }).subscribe(res => {
                    console.log(res)
                    if (res['code'] == 0) {

                        let list = res['data'].child;

                        let levelList1 = [];
                        list.forEach(item => {
                            // recommmend_type: "地区推荐"
                            if (item.recommmend_type == '地区推荐') {

                            } else {
                                levelList1.push({
                                    title: item.shopname + '--' + item.username,
                                    key: String(item.id)
                                })
                            }
                        })

                        if (levelList1.length > 0) {
                            node.addChildren(levelList1)
                        } else {
                            this.msgSrv.info("当前店铺没有下级")
                            node.addChildren(levelList1)
                        }
                        // node.addChildren(levelList1)
                    }
                })
                // this.loadNode().then(data => {
                //     node.addChildren(data);
                // });
            }
        }
    }

    areaEvent(event: Required<NzFormatEmitEvent>): void {
        console.log(event);
        // load child async
        if (event.eventName === 'expand') {
            const node = event.node;
            console.log(node.key)

            if (node && node.getChildren().length === 0 && node.isExpanded) {

                this.http.get(ROOT_URL + 'shop/message/getChildShopMessage', { shopid: node.key }).subscribe(res => {
                    console.log(res)
                    if (res['code'] == 0) {

                        let list = res['data'].child;

                        let levelList1 = [];
                        list.forEach(item => {
                            // recommmend_type: "地区推荐"
                            if (item.recommmend_type == '地区推荐') {
                                levelList1.push({
                                    title: item.shopname + '--' + item.username,
                                    key: String(item.id)
                                })
                            }
                        })
                        if (levelList1.length > 0) {
                            node.addChildren(levelList1)
                        } else {
                            this.msgSrv.info("当前店铺没有下级")
                            node.addChildren(levelList1)
                        }
                    }
                })
                // this.loadNode().then(data => {
                //     node.addChildren(data);
                // });
            }
        }
    }

    loadNode(): Promise<NzTreeNodeOptions[]> {
        return new Promise(resolve => {
            setTimeout(
                () =>
                    resolve([
                        { title: 'Child Node', key: `${new Date().getTime()}-0` },
                        { title: 'Child Node', key: `${new Date().getTime()}-1` }
                    ]),
                1000
            );
        });
    }
}