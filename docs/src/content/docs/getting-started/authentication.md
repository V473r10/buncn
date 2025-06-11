---
title: Authentication
description: Learn about authentication in Buncn.
---

## Introduction

Buncn uses `better-auth` for authentication. It is a simple and secure authentication system that can be used to authenticate users in your application.

## Pre-configured features

### Email & Password

You can create a user and sign in using email & password.

### Two-Factor Authentication

Go to `src/app/user/user-settings` to see the user settings page, where you can enable two-factor authentication.

![Two-Factor Authentication](/public/screenshots/account-menu.png)

From there is straightforward to enable two-factor authentication.

You need an authenticator app to generate a time-based one-time password (TOTP) and validate it.

You can visualize the backups code from there too.