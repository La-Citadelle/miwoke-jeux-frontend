/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink, NbAuthService, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { EMAIL_PATTERN } from '../constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InitUserService } from '../../../@theme/services/init-user.service';
import { UserData } from '../../../@core/interfaces/common/users';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  minLoginLength: number = this.getConfigValue(('forms.validation.fullName.minLength'));
  maxLoginLength: number = this.getConfigValue(('forms.validation.fullName.maxLength'));
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  isFullNameRequired: boolean = this.getConfigValue('forms.validation.fullName.required');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  redirectDelay: number = this.getConfigValue('forms.register.redirectDelay');
  showMessages: any = this.getConfigValue('forms.register.showMessages');
  strategy: string = this.getConfigValue('forms.register.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');

  code: string;
  submitted = false;
  tryLoginProcessing = true;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  registerForm: FormGroup;
  constructor(protected service: NbAuthService,
              private usersService: UserData,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              private fb: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute,
              protected initUserService: InitUserService) {
    const token = this.route.snapshot.fragment
      .split('&')
      .find((string) => string.split('=')[0] === 'access_token')
      .split('=');
    this.usersService.getDiscordUserInfos(`Bearer ${token[1]}`)
      .subscribe((user) => {
        this.user = user;
        this.registerForm.patchValue({
          email: user.email,
          fullName: user.username,
          avatar: user.avatar,
          id_discord: user.id
        });
        this.tryLogin({
          id_discord: user.id,
          email: user.email,
        });
    });
  }

  get login() { return this.registerForm.get('fullName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get terms() { return this.registerForm.get('terms'); }

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParamMap.get('code');
    
    const loginValidators = [
      Validators.minLength(this.minLoginLength),
      Validators.maxLength(this.maxLoginLength),
    ];
    this.isFullNameRequired && loginValidators.push(Validators.required);

    const emailValidators = [
      Validators.pattern(EMAIL_PATTERN),
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.registerForm = this.fb.group({
      fullName: this.fb.control('', [...loginValidators]),
      email: this.fb.control('', [...emailValidators]),
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
      terms: this.fb.control(''),
      avatar: this.fb.control(''),
      id_discord: this.fb.control(''),
    });
  }

  register(): void {
    this.user = this.registerForm.value;
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.initUser();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  initUser() {
    this.initUserService.initCurrentUser()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private tryLogin(options) {
    this.service.authenticate(this.strategy, options).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.initUser();
      } else {
        this.tryLoginProcessing = false;
      }
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }

      this.cd.detectChanges();
    });
  }
}
