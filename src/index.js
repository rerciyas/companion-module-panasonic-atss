import { runEntrypoint, InstanceBase, InstanceStatus } from '@companion-module/base'
import { getActionDefinitions } from './actions.js'
import { getFeedbackDefinitions } from './feedbacks.js'
import { getPresetDefinitions } from './presets.js'
import { setVariables, checkVariables } from './variables.js'
import { ConfigFields } from './config.js'
import { icons } from './icons.js'
import { UpgradeScripts } from './upgrades.js'

// import * as net from 'net'
import got from 'got'




// ########################
// #### Instance setup ####
// ########################
class PanasonicATSSInstance extends InstanceBase{
	

	async init(config){
		this.config = config
		this.icons = icons

		this.data = {
			debug: false,
			// cameracount: '9',
			cameraid: '1',
			tracking: 'ON',
			angle: 'UPPER'
		}

		// this.cameraid = '1'
		// this.tracking = 'ON'
		// this.angle = 'UPPER'
		
		this.config.host = this.config.host || ''
		this.config.httpPort = this.config.httpPort || 80
		this.config.username = this.config.username || ''
		this.config.password = this.config.password || ''
		this.config.cameraid = this.config.cameraid || 1
		this.config.debug = this.config.debug || false

		this.updateStatus(InstanceStatus.Connecting)
		this.init_actions()
		this.init_presets()
		this.init_variables()
		this.checkVariables()
		this.init_feedbacks()
		this.checkFeedbacks()
		
	}


	async configUpdated(config){
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)
		this.init_actions()
		this.init_presets()
		this.init_variables()
		this.checkVariables()
		this.init_feedbacks()
		this.checkFeedbacks()
	}

	getConfigFields() {
		return ConfigFields
	}


	// ##########################
	// #### Instance Presets ####
	// ##########################
	init_presets() {
		this.setPresetDefinitions(getPresetDefinitions(this))
	}

	// ############################
	// #### Instance Variables ####
	// ############################
	init_variables() {
		this.setVariableDefinitions(setVariables(this))
	}

	// Setup Initial Values
	checkVariables() {
		checkVariables(this)
	}

	// ############################
	// #### Instance Feedbacks ####
	// ############################
	init_feedbacks() {
		this.setFeedbackDefinitions(getFeedbackDefinitions(this))
	}

	init_actions() {
		this.setActionDefinitions(getActionDefinitions(this))
	}

}
runEntrypoint(PanasonicATSSInstance, UpgradeScripts)
