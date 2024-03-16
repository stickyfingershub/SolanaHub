import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Stake, StakePool } from 'src/app/models';
import { StakeComponent } from '../stake.component';
import {
  IonLabel,
  IonInput, 
  IonImg,
  IonChip,
  IonSkeletonText,
   IonText
 } from '@ionic/angular/standalone';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { UtilService } from 'src/app/services';
import { LiquidStakeService } from 'src/app/services/liquid-stake.service';
@Component({
  selector: 'delegate-lst-modal',
  templateUrl: './delegate-lst-modal.component.html',
  styleUrls: ['./delegate-lst-modal.component.scss'],
  standalone: true,
  imports: [IonImg, 
    StakeComponent, 
    IonLabel,
    IonInput,
    DecimalPipe,
    IonChip,
    IonSkeletonText,
     IonText,
     PercentPipe
  ]
})
export class DelegateLSTModalComponent implements OnInit{
  @Input() stake:Stake;
  @Input() targetStake: Stake;
  @Output() onSelectPool = new EventEmitter()
  public stakePools: StakePool[]
  public selectedPool: StakePool;

constructor(private _lss: LiquidStakeService){

}
  async ngOnInit() {
    const _listedPools = ['hub','solblaze', 'marinade']
    this.stakePools = (await this._lss.getStakePoolList()).filter(p => _listedPools.includes(p.poolName.toLowerCase()))
    
   }
   imagesLoaded = {};
   loadImage(uniqueId) {
     this.imagesLoaded[uniqueId] = true;
   }
   selectPool(pool: StakePool){
    this.selectedPool = pool;
    this.onSelectPool.emit({pool})
  }

}
