Aim:
To create a Cloud Organization in AWS with Roll-based access control.
Procedure:
To create an organization in AWS with role-based access ,you can follow these general steps:
1. Create an AWS account: If you don't already have an AWS account, you'll need to create one.
This will be your management account and the root of your organization.
2. Enable AWS Organizations: From the AWS Management Console, navigate to the AWS
Organizations service and enable it. This will create the organization with your management
account as the master account.
 3. Create OUs (Organizational Units): You can create one or more OUs to organize your

accounts. For example, you might create separate OUs for different departments or environments

(e.g., production, staging, development).

4. Create member accounts: You can create new AWS accounts and invite existing accounts

to join your organization as member accounts. You can add these accounts to the appropriate

OUs.

5. Create service control policies (SCPs): SCPs are policies that you can attach to OUs or

individual accounts to define the maximum set of actions that can be performed on resources in

those OUs or accounts. This allows you to enforce role- based access and other security policies

across your organization.

6. Assign IAM roles: You can create IAM roles in your management account and delegate

specific permissions to them. You can then assume these roles from your member accounts to 

perform actions on resources in the management account or other member accounts.

7. Configure permissions: You can use IAM policies to control access to AWS services and 

resources. You can attach these policies to IAM users, groups, or roles in your management 

account or member accounts
To create a role with specific permissions, you can follow these steps:

• Open the IAM console in your management account.

• Create a new role and choose the appropriate trusted entity (e.g., another AWS account, an AWS

service, or your AWS Organizations).

• Define the permissions for the role by attaching an IAM policy or a service control policy(SCP).

• Save the role and noted own the ARN (Amazon Resource Name)of the role.

• In the AWS Organizations console, attach the role to the appropriate OU or account.

• In the member account, assume the role to perform actions on resources in the management

account or other member accounts.

Result:

Thus, the Cloud Organization was created in AWS with Role-Based Access Control was

implemented successfull
