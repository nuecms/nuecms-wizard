export const defaultConfig = {
  mysql: { // MySQL config
    host: "127.0.0.1",
    port: '3306',
    username: "root",
    password: "root123456",
    database: "nuecmstest",
    prefix: "nc_",
  },
  redis: { // Redis config
    host: "127.0.0.1",
    port: '6379',
    password: "",
  },
  admin: { // Administrator account
    username: "admin",
    password: "admin123",
    password2: "admin123",
  }
};

export const stepsConfig = [
  {
    title: 'wizard.licenseTitle', // License step title
    key: 'license',  // Unique key for the license step
    fields: [],
  },
  {
    title: 'wizard.systemOverview', // System Overview
    key: 'overview',
    fields: [], // No input fields, just an informational step
  },
  {
    title: 'wizard.mysqlConfig',
    key: 'mysql', // Key for MySQL step
    fields: [
      { name: 'host', label: 'wizard.host', type: 'text', placeholder: 'localhost', required: true },
      { name: 'port', label: 'wizard.port', type: 'number', placeholder: '3306', required: true },
      { name: 'username', label: 'wizard.username', type: 'text', placeholder: 'root', required: true },
      { name: 'password', label: 'wizard.password', type: 'password', placeholder: 'wizard.password', required: true },
      { name: 'database', label: 'wizard.database', type: 'text', placeholder: 'myapp', required: true },
      { name: 'prefix', label: 'wizard.prefix', type: 'text', placeholder: 'myapp_', required: false },
    ]
  },
  {
    title: '',
    children: [
      {
        title: 'wizard.redisConfig',
        key: 'redis', // Key for Redis step
        fields: [
          { name: 'host', label: 'wizard.host', type: 'text', placeholder: 'localhost', required: true },
          { name: 'port', label: 'wizard.port', type: 'number', placeholder: '6379', required: true },
          { name: 'password', label: 'wizard.password', type: 'password', placeholder: 'wizard.password', required: false },
        ]
      },
      {
        // administator account
        title: 'wizard.adminAccount',
        key: 'admin',
        fields: [
          { name: 'username', label: 'wizard.adminAccount', type: 'text', placeholder: 'wizard.adminAccount', required: true },
          { name: 'password', label: 'wizard.adminPassword', type: 'password', placeholder: 'wizard.adminPassword', required: true },
          { name: 'password2', label: 'wizard.confirmPassword', type: 'password', placeholder: 'wizard.confirmPassword', required: true }
        ]
      }
    ]
  }
]


// i18n

export const languageLabels: { [key: string]: string } = {
  en: 'English',
  zh: '中文',
}

export const messages = {
  en: {
    wizard: {
      step1: 'Step 1',
      step2: 'Step 2',
      step3: 'Step 3',
      step4: 'Step 4',
      installLocked: 'Installation Confirm',
      installLockedMessage: 'The installation has already been completed. Are you sure you want to run the configuration wizard again?',
      installLockedConfirm: 'OK',
      installLockedCancel: 'Cancel',
      title: 'ConfigWizard',
      language: 'Language',
      licenseSetup: 'License Setup',
      systemOverview: 'System Overview',
      mysqlConfig: 'MySQL Configuration',
      redisConfig: 'Redis Configuration',
      host: 'Host',
      port: 'Port',
      username: 'Username',
      password: 'Password',
      database: 'Database Name',
      prefix: 'Table Prefix',
      adminAccount: 'Admin Account',
      adminPassword: 'Admin Password',
      confirmPassword: 'Confirm Password',
      prev: 'Previous',
      next: 'Next',
      finish: 'Finish',
      completed: 'Configuration Completed!',
      uncompleted: 'Configuration Failed!',
      error: 'Error: {msg}',
      configSaved: 'Configuration saved successfully. Database initialized and config files updated.',
      licenseTitle: 'License Agreement',
      acceptLicense: 'I accept the terms of the license',
      licenseError: 'You must accept the license to continue.',
      // licenseAgreementText: `
      //   <h2>BUSINESS SOFTWARE LICENSE AGREEMENT</h2>
      //   <p>This Business Software License Agreement (the "Agreement") is entered into as of the date of installation or first use of the software (the "Effective Date") by and between ConfigWizard Inc., a corporation organized and existing under the laws of [State/Country] with its principal place of business at [Address] ("Licensor"), and the entity or individual installing or first using the software ("Licensee").</p>

      //   <h3>1. GRANT OF LICENSE</h3>
      //   <p>Subject to the terms and conditions of this Agreement, Licensor hereby grants to Licensee a non-exclusive, non-transferable license to use the ConfigWizard software (the "Software") solely for Licensee's internal business purposes.</p>

      //   <h3>2. RESTRICTIONS</h3>
      //   <p>Licensee shall not: (a) copy, modify, or create derivative works of the Software; (b) reverse engineer, decompile, or disassemble the Software; (c) sublicense, rent, lease, or lend the Software; (d) use the Software for providing services to third parties; or (e) remove or alter any proprietary notices on the Software.</p>

      //   <h3>3. INTELLECTUAL PROPERTY</h3>
      //   <p>Licensee acknowledges that Licensor retains all right, title, and interest in and to the Software, including all intellectual property rights therein. This Agreement does not grant Licensee any rights to patents, copyrights, trade secrets, trademarks, or any other rights in respect to the Software.</p>

      //   <h3>4. TERM AND TERMINATION</h3>
      //   <p>This Agreement is effective until terminated. Licensor may terminate this Agreement immediately if Licensee breaches any provision. Upon termination, Licensee shall cease all use of the Software and destroy all copies in its possession or control.</p>

      //   <h3>5. WARRANTY DISCLAIMER</h3>
      //   <p>THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. LICENSOR DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

      //   <h3>6. LIMITATION OF LIABILITY</h3>
      //   <p>IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.</p>

      //   <h3>7. GOVERNING LAW</h3>
      //   <p>This Agreement shall be governed by and construed in accordance with the laws of [State/Country], without regard to its conflict of law principles.</p>

      //   <h3>8. ENTIRE AGREEMENT</h3>
      //   <p>This Agreement constitutes the entire agreement between the parties concerning the subject matter hereof and supersedes all prior or contemporaneous oral or written agreements.</p>
      //   `,
      installationSuccess: 'Installation Successful',
      installationFailed: 'Installation Failed',
      successMessage: 'Your configuration has been saved and the system is ready to use.',
      // System Overview Translations
      serverInfo: 'Server Information',
      webServerEnvironment: 'Web Server Environment',
      hardwareInfo: 'Hardware Information',
      environmentVariables: 'Environment Variables',
      directoryPermissions: 'Directory Permissions',
      databaseInfo: 'Database Information',
      operatingSystem: 'Operating System',
      hostName: 'Host Name',
      systemUptime: 'System Uptime',
      serverType: 'Server Type',
      nodeVersion: 'Node.js Version',
      workingDirectory: 'Working Directory',
      execPath: 'Executable Path',
      cpuCoreCount: 'CPU Core Count',
      cpuModel: 'CPU Model',
      totalMemory: 'Total Memory',
      freeMemory: 'Free Memory',
      environmentVariableCount: 'Environment Variable Count',
      nodeEnv: 'NODE_ENV',
      rootDirectoryWritable: 'Root Directory Writable',
      dataDirectoryWritable: 'Data Directory Writable',
      mysqlVersion: 'MySQL Version',
      redisVersion: 'Redis Version'
    },
    "license": {
      "title": "License Agreement",
      "intro": "Welcome to NUECMS! Before you proceed, we ask that you carefully read the following terms and conditions. These terms govern your use of NUECMS software, so please take a moment to understand them.",
      "sections": [
        {
          "title": "1. License Grant",
          "content": "You are granted a non-exclusive, non-transferable license to use this software for personal or commercial projects. This license is perpetual unless terminated under the terms below."
        },
        {
          "title": "2. Restrictions",
          "content": "You may not redistribute, sell, or sublicense the software. You are not permitted to remove or alter any copyright notices in the software."
        },
        {
          "title": "3. Modifications",
          "content": "You may modify the source code for personal use or internal development, but any modifications made to the software cannot be redistributed without explicit permission from the authors."
        },
        {
          "title": "4. No Warranty",
          "content": "The software is provided 'as-is' without any warranty of any kind. We do not guarantee that the software will meet your requirements or that it will be error-free."
        },
        {
          "title": "5. Limitation of Liability",
          "content": "We are not responsible for any damages, direct or indirect, resulting from the use or inability to use the software, even if we have been advised of the possibility of such damages."
        },
        {
          "title": "6. Termination",
          "content": "This license will terminate immediately upon breach of any of the terms of this agreement. Upon termination, you must cease using the software and destroy all copies in your possession."
        }
      ],
      "notice": "By proceeding, you acknowledge that you have read, understood, and agree to these terms.",
      "acceptButton": "I Agree",
      "declineButton": "I Decline"
    }

  },
  zh: {
    wizard: {
      step1: '第一步',
      step2: '第二步',
      step3: '第三步',
      step4: '第四步',
      installLocked: '安装确认',
      installLockedMessage: '安装已经完成，您确定要再次运行配置向导吗？',
      installLockedConfirm: '确定',
      installLockedCancel: '取消',
      title: '配置向导',
      language: '语言',
      licenseSetup: '许可证设置',
      systemOverview: '系统概览',
      mysqlConfig: 'MySQL 配置',
      redisConfig: 'Redis 配置',
      host: '主机地址',
      port: '端口',
      username: '用户名',
      password: '密码',
      database: '数据库名',
      prefix: '表前缀',
      adminAccount: '管理员账号',
      adminPassword: '管理员密码',
      confirmPassword: '确认密码',
      prev: '上一步',
      next: '下一步',
      finish: '完成',
      completed: '配置完成！',
      uncompleted: '配置失败！',
      error: '错误：{msg}',
      configSaved: '配置保存成功。数据库已初始化，配置文件已更新。',
      licenseTitle: '许可协议',
      acceptLicense: '我接受许可条款',
      licenseError: '您必须接受许可才能继续。',
      installationSuccess: '安装成功',
      installationFailed: '安装失败',
      successMessage: '您的配置已保存，系统已准备就绪。',
      // System Overview Translations
      serverInfo: '服务器信息',
      webServerEnvironment: 'Web服务器环境',
      hardwareInfo: '硬件信息',
      environmentVariables: '环境变量',
      directoryPermissions: '目录权限',
      databaseInfo: '数据库信息',
      operatingSystem: '操作系统',
      hostName: '主机名',
      systemUptime: '系统运行时间',
      serverType: '服务器类型',
      nodeVersion: 'Node.js 版本',
      workingDirectory: '工作目录',
      execPath: '可执行文件路径',
      cpuCoreCount: 'CPU 核心数',
      cpuModel: 'CPU 型号',
      totalMemory: '总内存',
      freeMemory: '可用内存',
      environmentVariableCount: '环境变量数量',
      nodeEnv: 'NODE_ENV',
      rootDirectoryWritable: '根目录可写',
      dataDirectoryWritable: '数据目录可写',
      mysqlVersion: 'MySQL 版本',
      redisVersion: 'Redis 版本'
    },
    license: {
      "title": "许可协议",
      "intro": "欢迎使用NUECMS！在继续之前，我们请求您仔细阅读以下条款和条件。这些条款管辖您对NUECMS软件的使用，因此请花点时间理解它们。",
      "sections": [
        {
          "title": "1. 授权许可",
          "content": "您被授予一个非独占、不可转让的许可，以便在个人或商业项目中使用此软件。此许可是永久的，除非根据以下条款终止。"
        },
        {
          "title": "2. 限制",
          "content": "您不得重新分发、出售或再许可软件。您不能删除或更改软件中的任何版权声明。"
        },
        {
          "title": "3. 修改",
          "content": "您可以修改源代码以供个人使用或内部开发，但不得在没有作者明确许可的情况下重新分发任何修改。"
        },
        {
          "title": "4. 无担保",
          "content": "本软件按“现状”提供，不提供任何形式的担保。我们不保证软件会满足您的需求，也不保证其没有错误。"
        },
        {
          "title": "5. 责任限制",
          "content": "我们不对任何因使用或无法使用软件而造成的直接或间接损害负责，即使我们已经被告知存在这种损害的可能性。"
        },
        {
          "title": "6. 终止",
          "content": "如果违反本协议的任何条款，本许可将立即终止。终止后，您必须停止使用该软件并销毁所有副本。"
        }
      ],
      "notice": "继续操作即表示您已阅读、理解并同意这些条款。",
      "acceptButton": "我同意",
      "declineButton": "我不同意"
    }
  }
}
