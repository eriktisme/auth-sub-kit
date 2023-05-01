'use client'

import { Auth } from 'aws-amplify'
import { config } from './config'

Auth.configure(config)
