---
title: "Practice Exam AWS Certified Solutions Architect Professional"
date: "2023-09-25"
draft: false
tags: ["AWS"]
description: "Practice questions and explanations for the AWS Certified Solutions Architect Professional exam."
category: "AWS"
---

Practice Exam AWS Certified Solutions Architect Professional
326–414 minutes

Chart

Pie chart with 4 slices.

End of interactive chart.

Attempt 2
Question 1: Incorrect

An e-commerce web application is hosted on Amazon EC2 instances that are fronted by Application Load Balancer (ALB) configured with an Auto Scaling group (ASG). Enhanced security is provided to the ALB by AWS WAF web ACLs. As per the company's security policy, AWS CloudTrail is activated and logs are configured to be stored on Amazon S3 and CloudWatch Logs.

A discount sales offer was run on the application for a week. The support team has noticed that a few of the instances have rebooted taking down the log files and all temporary data with them. Initial analysis has confirmed that the incident took place during off-peak hours. Even though the incident did not cause any sales or revenue loss, the CTO has asked the security team to fix the security error that has allowed the incident to go unnoticed and eventually untraceable.

What steps will you implement to permanently record all traffic coming into the application?

    Configure Elastic Load Balancing to write access logs to Amazon Kinesis Data Firehose. The logs can be further directed from Firehose into an Amazon S3 bucket for further analysis and reporting

    (Incorrect)

    Configure the WAF web ACL to deliver logs to Amazon CloudTrail and create a trail that applies to all Regions. This delivers log files from all Regions to an S3 bucket. Use Athena to query the logs for errors and tracking

    Configure the WAF web ACL to deliver logs to Amazon Kinesis Data Firehose, which should be configured to eventually store the logs in an Amazon S3 bucket. Use Athena to query the logs for errors and tracking

    (Correct)

    To capture information about the IP traffic going to and from network interfaces, configure VPC Flow Logs to be directly streamed to Kinesis Data Streams and create alarms for automatic monitoring

Explanation

Correct option:

Configure the WAF web ACL to deliver logs to Amazon Kinesis Data Firehose, which should be configured to eventually store the logs in an Amazon S3 bucket. Use Athena to query the logs for errors and tracking

The logging destinations that you can choose from for your AWS WAF logs are:

    Amazon CloudWatch Logs
    Amazon Simple Storage Service
    Amazon Kinesis Data Firehose

To send logs to Amazon Kinesis Data Firehose, you send logs from your web ACL to an Amazon Kinesis Data Firehose with a configured storage destination. After you enable logging, AWS WAF delivers logs to your storage destination through the HTTPS endpoint of Kinesis Data Firehose.

One AWS WAF log is equivalent to one Kinesis Data Firehose record. If you typically receive 10,000 requests per second and you enable full logs, you should have 10,000 records per second setting in Kinesis Data Firehose.

Incorrect options:

Configure the WAF web ACL to deliver logs to Amazon CloudTrail and create a trail that applies to all Regions. This delivers log files from all Regions to an S3 bucket. Use Athena to query the logs for errors and tracking - As discussed above, the logging destinations that you can choose from for your AWS WAF logs are Amazon CloudWatch Logs, Amazon Simple Storage Service, and Amazon Kinesis Data Firehose. Amazon CloudTrail is not a valid destination for WAF ACL logs.

To capture information about the IP traffic going to and from network interfaces, configure VPC Flow Logs to be directly streamed to Kinesis Data Streams and create alarms for automatic monitoring - VPC Flow You should also note that VPC Flow Logs cannot capture all traffic coming into the application as these can only capture information about the IP traffic going to and from network interfaces in your VPC. In addition, VPC Flow Logs can be directly published only to the following destinations: Amazon CloudWatch Logs, Amazon S3, or Amazon Kinesis Data Firehose. So this option is incorrect.

Configure Elastic Load Balancing to write access logs to Amazon Kinesis Data Firehose. The logs can be further directed from Firehose into an Amazon S3 bucket for further analysis and reporting - Elastic Load Balancing provides access logs that capture detailed information about requests sent to your load balancer. Elastic Load Balancing access logs are stored in Amazon S3 buckets and it is not possible to directly write the logs to Kinesis Data Firehose.

References:

https://aws.amazon.com/about-aws/whats-new/2021/12/awf-waf-cloudwatch-log-s3-bucket/

https://docs.aws.amazon.com/waf/latest/developerguide/logging-destinations.html

https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html
Question 2: Correct

A leading internet television network company uses AWS Cloud for analytics, recommendation engines and video transcoding. To monitor and optimize this network, the engineering team at the company has developed a solution for ingesting, augmenting, and analyzing the multiple terabytes of data its network generates daily in the form of virtual private cloud (VPC) flow logs. This would enable the company to identify performance-improvement opportunities such as identifying apps that are communicating across regions and collocating them. The VPC flow logs data is funneled into Kinesis Data Streams which further acts as the source of a delivery stream for Kinesis Firehose. The engineering team has now configured a Kinesis Agent to send the VPC flow logs data from another set of network devices to the same Firehose delivery stream. They noticed that data is not reaching Firehose as expected.

As a Solutions Architect Professional, which of the following options would you identify as the MOST plausible root cause behind this issue?

    Kinesis Agent can only write to Kinesis Data Streams, not to Kinesis Firehose

    Kinesis Agent cannot write to a Kinesis Firehose for which the delivery stream source is already set as Kinesis Data Streams

    (Correct)

    Kinesis Firehose delivery stream has reached its limit and needs to be scaled manually

    The data sent by Kinesis Agent is lost because of a configuration error

Explanation

Correct option:

Kinesis Agent cannot write to a Kinesis Firehose for which the delivery stream source is already set as Kinesis Data Streams

Amazon Kinesis Data Firehose is the easiest way to reliably load streaming data into data lakes, data stores, and analytics tools. It is a fully managed service that automatically scales to match the throughput of your data and requires no ongoing administration. It can also batch, compress, transform, and encrypt the data before loading it, minimizing the amount of storage used at the destination and increasing security.

When a Kinesis data stream is configured as the source of a Firehose delivery stream, Firehose’s PutRecord and PutRecordBatch operations are disabled and Kinesis Agent cannot write to Firehose delivery stream directly. Data needs to be added to the Kinesis data stream through the Kinesis Data Streams PutRecord and PutRecords operations instead. Therefore, this option is correct.

Incorrect options:

Kinesis Agent can only write to Kinesis Data Streams, not to Kinesis Firehose - Kinesis Agent is a stand-alone Java software application that offers an easy way to collect and send data to Kinesis Data Streams or Kinesis Firehose. So this option is incorrect.

Kinesis Firehose delivery stream has reached its limit and needs to be scaled manually - Kinesis Firehose is a fully managed service that automatically scales to match the throughput of your data and requires no ongoing administration. Therefore this option is not correct.

How Kinesis Firehose works: via - https://aws.amazon.com/kinesis/data-firehose/

The data sent by Kinesis Agent is lost because of a configuration error - This is a made-up option and has been added as a distractor.

References:

https://aws.amazon.com/kinesis/data-firehose/

https://aws.amazon.com/kinesis/data-firehose/faqs/
Question 3: Correct

A leading club in the Major League Baseball runs a web platform that boasts over 50,000 pages and over 100 million digitized photographs. It is available in six languages and maintains up-to-date information for the season. The engineering team has built a notification system on the web platform using SNS notifications which are then handled by a Lambda function for end-user delivery. During the off-season, the notification systems need to handle about 100 requests per second. During the peak baseball season, the rate touches about 5000 requests per second and it is noticed that a significant number of the notifications are not being delivered to the end-users on the web platform.

As a Solutions Architect Professional, which of the following would you suggest as the BEST fit solution to address this issue?

    Amazon SNS message deliveries to AWS Lambda have crossed the account concurrency quota for Lambda, so the team needs to contact AWS support to raise the account limit

    (Correct)

    The engineering team needs to provision more servers running the SNS service

    The engineering team needs to provision more servers running the Lambda service

    Amazon SNS has hit a concurrency limit, so the team needs to contact AWS support to raise the account limit

Explanation

Correct option: Amazon SNS message deliveries to AWS Lambda have crossed the account concurrency quota for Lambda, so the team needs to contact AWS support to raise the account limit

Amazon Simple Notification Service (SNS) is a highly available, durable, secure, fully managed pub/sub messaging service that enables you to decouple microservices, distributed systems, and serverless applications.

How SNS Works: via - https://aws.amazon.com/sns/

With AWS Lambda, you can run code without provisioning or managing servers. You pay only for the compute time that you consume—there’s no charge when your code isn’t running.

AWS Lambda currently supports 1000 concurrent executions per AWS account per region. If your Amazon SNS message deliveries to AWS Lambda contribute to crossing these concurrency quotas, your Amazon SNS message deliveries will be throttled. You need to contact AWS support to raise the account limit. Therefore this option is correct.

via - https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html

Incorrect options: Amazon SNS has hit a concurrency limit, so the team needs to contact AWS support to raise the account limit - Amazon SNS leverages the proven AWS cloud to dynamically scale with your application. You don't need to contact AWS support, as SNS is a fully managed service, taking care of the heavy lifting related to capacity planning, provisioning, monitoring, and patching. Therefore, this option is incorrect.

The engineering team needs to provision more servers running the SNS service

The engineering team needs to provision more servers running the Lambda service

As both Lambda and SNS are serverless and fully managed services, the engineering team cannot provision more servers. Both of these options are incorrect.

Reference: https://aws.amazon.com/sns/

https://aws.amazon.com/sns/faqs/

https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html
Question 4: Correct

A multi-national retail company has built a hub-and-spoke network with AWS Transit Gateway. VPCs have been provisioned into multiple AWS accounts to facilitate network isolation and to enable delegated network administration. The organization is looking at a cost-effective, quick and secure way of maintaining this distributed architecture so that it provides access to services required by workloads in each of the VPCs.

As a Solutions Architect Professional, which of the following options would you recommend for the given use-case?

    Use Fully meshed VPC Peers

    Use Transit VPC to reduce cost and share the resources across VPCs

    Use VPCs connected with AWS Direct Connect

    Use Centralized VPC Endpoints for connecting with multiple VPCs, also known as shared services VPC

    (Correct)

Explanation

Correct option:

Use Centralized VPC Endpoints for connecting with multiple VPCs, also known as shared services VPC - A VPC endpoint allows you to privately connect your VPC to supported AWS services without requiring an Internet gateway, NAT device, VPN connection, or AWS Direct Connect connection. Endpoints are virtual devices that are horizontally scaled, redundant, and highly available VPC components. They allow communication between instances in your VPC and services without imposing availability risks or bandwidth constraints on your network traffic.

VPC endpoints enable you to reduce data transfer charges resulting from network communication between private VPC resources (such as Amazon Elastic Cloud Compute—or EC2—instances) and AWS Services (such as Amazon Quantum Ledger Database, or QLDB). Without VPC endpoints configured, communications that originate from within a VPC destined for public AWS services must egress AWS to the public Internet in order to access AWS services. This network path incurs outbound data transfer charges. Data transfer charges for traffic egressing from Amazon EC2 to the Internet vary based on volume. With VPC endpoints configured, communication between your VPC and the associated AWS service does not leave the Amazon network. If your workload requires you to transfer significant volumes of data between your VPC and AWS, you can reduce costs by leveraging VPC endpoints.

In larger multi-account AWS environments, network design can vary considerably. Consider an organization that has built a hub-and-spoke network with AWS Transit Gateway. VPCs have been provisioned into multiple AWS accounts, perhaps to facilitate network isolation or to enable delegated network administration. When deploying distributed architectures such as this, a popular approach is to build a "shared services VPC, which provides access to services required by workloads in each of the VPCs. This might include directory services or VPC endpoints. Sharing resources from a central location instead of building them in each VPC may reduce administrative overhead and cost.

Centralized VPC Endpoints (multiple VPCs): via - https://aws.amazon.com/blogs/architecture/reduce-cost-and-increase-security-with-amazon-vpc-endpoints/

Incorrect options:

Use Transit VPC to reduce cost and share the resources across VPCs - Transit VPC uses customer-managed Amazon Elastic Compute Cloud (Amazon EC2) VPN instances in a dedicated transit VPC with an Internet gateway. This design requires the customer to deploy, configure, and manage EC2-based VPN appliances, which will result in additional EC2 instances, and potentially third-party product and licensing charges. Note that this design will generate additional data transfer charges for traffic traversing the transit VPC: data is charged when it is sent from a spoke VPC to the transit VPC, and again from the transit VPC to the on-premises network or to a different AWS Region. Transit VPC is not the right choice here because it's not cost-optimal for the given use-case.

More on Transit VPC: via - https://d0.awsstatic.com/aws-answers/AWS_Single_Region_Multi_VPC_Connectivity.pdf

Use Fully meshed VPC Peers - This approach creates multiple peering connections to facilitate the sharing of information between resources in different VPCs. This design connects multiple VPCs in a fully meshed configuration, with peering connections between each pair of VPCs. With this configuration, each VPC has access to the resources in all other VPCs. Each peering connection requires modifications to all the other VPCs’ route tables and, as the number of VPCs grows, this can be difficult to maintain. And keep in mind that AWS recommends a maximum of 125 peering connections per VPC. It's complex to manage and isn't the right fit for the current scenario.

More on Fully meshed VPC Peers: via - https://d0.awsstatic.com/aws-answers/AWS_Single_Region_Multi_VPC_Connectivity.pdf

Use VPCs connected with AWS Direct Connect - This approach is a good alternative for customers who need to connect a high number of VPCs to a central VPC or to on-premises resources, or who already have an AWS Direct Connect connection in place. This design also offers customers the ability to incorporate transitive routing into their network design. For example, if VPC A and VPC B are both connected to an on-premises network using AWS Direct Connect connections, then the two VPCs can be connected to each other via AWS Direct Connect. Direct Connect requires physical cables and takes about a month for setting up. This option is not the best fit for the current scenario as there is no on-premises component for the given IT infrastructure.

References:

https://aws.amazon.com/blogs/architecture/reduce-cost-and-increase-security-with-amazon-vpc-endpoints/

https://d0.awsstatic.com/aws-answers/AWS_Single_Region_Multi_VPC_Connectivity.pdf
Question 5: Incorrect

The engineering team at a healthcare company is working on the Disaster Recovery (DR) plans for its Redshift cluster deployed in the eu-west-1 Region. The existing cluster is encrypted via AWS KMS and the team wants to copy the Redshift snapshots to another Region to meet the DR requirements.

As a Solutions Architect Professional, which of the following solutions would you suggest to address the given use-case?

    Create a snapshot copy grant in the source Region for a KMS key in the source Region. Configure Redshift cross-Region snapshots in the destination Region

    Create a snapshot copy grant in the destination Region for a KMS key in the destination Region. Configure Redshift cross-Region snapshots in the source Region

    (Correct)

    Create a snapshot copy grant in the destination Region for a KMS key in the destination Region. Configure Redshift cross-Region replication in the source Region

    (Incorrect)

    Create an IAM role in destination Region with access to the KMS key in the source Region. Create a snapshot copy grant in the destination Region for this KMS key in the source Region. Configure Redshift cross-Region snapshots in the source Region

Explanation

Correct option:

Create a snapshot copy grant in the destination Region for a KMS key in the destination Region. Configure Redshift cross-Region snapshots in the source Region

To copy snapshots for AWS KMS–encrypted clusters to another AWS Region, you need to create a grant for Redshift to use a KMS customer master key (CMK) in the destination AWS Region. Then choose that grant when you enable copying of snapshots in the source AWS Region. You cannot use a KMS key from the source Region as AWS KMS keys are specific to an AWS Region.

via - https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-db-encryption.html#configure-snapshot-copy-grant

Incorrect options:

Create a snapshot copy grant in the source Region for a KMS key in the source Region. Configure Redshift cross-Region snapshots in the destination Region - As described above, you need to configure the Redshift cross-Region snapshot in the source Region and not the destination Region. Also, the snapshot copy grant must be set up in the destination Region for a KMS key in the destination Region.

Create an IAM role in destination Region with access to the KMS key in the source Region. Create a snapshot copy grant in the destination Region for this KMS key in the source Region. Configure Redshift cross-Region snapshots in the source Region - This has been added as a distractor as AWS KMS keys are specific to an AWS Region. You cannot create a snapshot copy grant in the destination Region for a KMS key in the source Region.

Create a snapshot copy grant in the destination Region for a KMS key in the destination Region. Configure Redshift cross-Region replication in the source Region - This has been added as a distractor as there is no such thing as cross-Region replication for Redshift. The concept of cross-Region replication (CRR) applies to Amazon S3.

Reference:

https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-db-encryption.html#configure-snapshot-copy-grant
Question 6: Incorrect

An Internet-of-Things (IoT) company is using Kinesis Data Streams (KDS) to process IoT data from field devices. Multiple consumer applications are using the incoming data streams and the engineers have noticed a performance lag for the data delivery speed between producers and consumers of the data streams.

As a Solutions Architect Professional, which of the following would you recommend to improve the performance for the given use-case?

    Swap out Kinesis Data Streams with Kinesis Data Firehose to support the desired read throughput for the downstream applications

    (Incorrect)

    Swap out Kinesis Data Streams with SQS Standard queues to support the desired read throughput for the downstream applications

    Use Enhanced Fanout feature of Kinesis Data Streams to support the desired read throughput for the downstream applications

    (Correct)

    Swap out Kinesis Data Streams with SQS FIFO queues to support the desired read throughput for the downstream applications

Explanation

Correct option:

Use Enhanced Fanout feature of Kinesis Data Streams to support the desired read throughput for the downstream applications

Amazon Kinesis Data Streams (KDS) is a massively scalable and durable real-time data streaming service. KDS can continuously capture gigabytes of data per second from hundreds of thousands of sources such as website clickstreams, database event streams, financial transactions, social media feeds, IT logs, and location-tracking events. By default, the 2MB/second/shard output is shared between all of the applications consuming data from the stream.

You should use enhanced fan-out if you have multiple consumers retrieving data from a stream in parallel. With enhanced fan-out developers can register stream consumers to use enhanced fan-out and receive their own 2MB/second pipe of read throughput per shard, and this throughput automatically scales with the number of shards in a stream.

via - https://aws.amazon.com/blogs/aws/kds-enhanced-fanout/

via - https://aws.amazon.com/blogs/aws/kds-enhanced-fanout/

Incorrect options:

Swap out Kinesis Data Streams with Kinesis Data Firehose to support the desired read throughput for the downstream applications - Amazon Kinesis Data Firehose is the easiest way to reliably load streaming data into data lakes, data stores, and analytics tools. It is a fully managed service that automatically scales to match the throughput of your data and requires no ongoing administration. It can also batch, compress, transform, and encrypt the data before loading it, minimizing the amount of storage used at the destination and increasing security. Kinesis Data Firehose can only write to S3, Redshift, Elasticsearch or Splunk. You can't have applications consuming data streams from Kinesis Data Firehose, that's the job of Kinesis Data Streams. Therefore this option is not correct.

Swap out Kinesis Data Streams with SQS Standard queues to support the desired read throughput for the downstream applications

Swap out Kinesis Data Streams with SQS FIFO queues to support the desired read throughput for the downstream applications

Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. SQS offers two types of message queues. Standard queues offer maximum throughput, best-effort ordering, and at-least-once delivery. SQS FIFO queues are designed to guarantee that messages are processed exactly once, in the exact order that they are sent. As multiple applications are consuming the same stream concurrently, both SQS Standard and SQS FIFO are not the right fit for the given use-case.

via - https://aws.amazon.com/kinesis/data-streams/faqs/

References:

https://aws.amazon.com/blogs/aws/kds-enhanced-fanout/

https://aws.amazon.com/kinesis/data-streams/faqs/
Question 7: Incorrect

An e-commerce company has hired an AWS Certified Solutions Architect Professional to transform a standard three-tier web application architecture in AWS. Currently, the web and application tiers run on EC2 instances and the database tier runs on RDS MySQL. The company wants to redesign the web and application tiers to use API Gateway with Lambda Functions with the final goal of deploying the new application within 6 months. As an immediate short-term task, the Engineering Manager has mandated the Solutions Architect to reduce costs for the existing stack.

Which of the following options should the Solutions Architect recommend as the MOST cost-effective and reliable solution?

    Provision Reserved Instances for the web and application tiers and On-Demand Instances for the database tier

    Provision On-Demand Instances for the web and application tiers and Reserved Instances for the database tier

    (Correct)

    Provision Spot Instances for the web and application tiers and Reserved Instances for the database tier

    (Incorrect)

    Provision Reserved Instances for the web, application and database tiers

Explanation

Correct option:

Provision On-Demand Instances for the web and application tiers and Reserved Instances for the database tier

EC2 Instances support five different ways to pay for provisioning the servers: On-Demand, Savings Plans, Reserved Instances, Spot Instances and Dedicated Hosts.

via - https://aws.amazon.com/ec2/pricing/

An On-Demand Instance is an instance that you use on-demand. You have full control over its lifecycle — you decide when to launch, stop, hibernate, start, reboot, or terminate it. There is no long-term commitment required when you purchase On-Demand Instances. There is no upfront payment and you pay only for the seconds that your On-Demand Instances are running. The price per second for running an On-Demand Instance is fixed. On-demand instances cannot be interrupted. However, On-demand instances are not as cost-effective as Reserved instances.

A Spot Instance is an unused EC2 instance that is available for less than the On-Demand price. Because Spot Instances enable you to request unused EC2 instances at steep discounts (up to 90%), you can lower your Amazon EC2 costs significantly. Spot Instances are well-suited for data analysis, batch jobs, background processing, and optional tasks. These can be terminated at short notice, so these are not suitable for critical workloads that need to run at a specific point in time.

Reserved Instances provide you with significant savings (up to 75%) on your Amazon EC2 costs compared to On-Demand Instance pricing. Reserved Instances are not physical instances, but rather a billing discount applied to the use of On-Demand Instances in your account. You can purchase a Reserved Instance for a one-year or three-year commitment, with the three-year commitment offering a bigger discount. Reserved instances cannot be interrupted.

For the given use-case, only the web and application tiers would be re-engineered using API Gateway and Lambda within a duration of 6 months, so you cannot use Reserved Instances for these tiers as the minimum duration to purchase a Reserved Instance is 1 year. Additionally, using Spot Instances for these tiers is also ruled out because these can be terminated at short notice and would not be able to offer reliability for the web and application tiers. Therefore On-Demand is the best option for the web and application tiers. As the proposed transformation would not impact the database tier running on RDS MySQL, therefore you can purchase Reserved Instances for the database tier as the most cost-effective solution.

Incorrect options:

Provision Reserved Instances for the web, application and database tiers - As explained above, Reserved Instances are not a good fit for running the web and application tiers, so this option is not correct.

Provision Spot Instances for the web and application tiers and Reserved Instances for the database tier - As explained above, Spot Instances are not a good fit for running the web and application tiers, so this option is not correct.

Provision Reserved Instances for the web and application tiers and On-Demand Instances for the database tier - As explained above, Reserved Instances are not a good fit for running the web and application tiers, so this option is not correct. Also using On-Demand Instances for the database tier is not the most cost-effective option as you should use Reserved Instances for the database tier.

Reference:

https://aws.amazon.com/ec2/pricing/
Question 8: Incorrect

A health and beauty products company processes thousands of orders each day from 100 countries and its website is localized in 15 languages. The company’s website faces continual security threats and challenges in the form of HTTP flood attacks, distributed denial of service (DDoS) attacks, rogue robots that flood its website with traffic, SQL-injection attacks designed to extract data and cross-site scripting attacks (XSS). Most of these attacks originate from certain countries. Therefore, the company wants to block access to its application from specific countries; however, the company wants to allow its remote development team (from one of the blocked countries) to have access to the application. The application is deployed on EC2 instances running under an Application Load Balancer (ALB) with AWS WAF.

As a Solutions Architect Professional, which of the following solutions would you suggest as the BEST fit for the given use-case? (Select two)

    Use WAF geo match statement listing the countries that you want to block

    (Correct)

    Use ALB IP set statement that specifies the IP addresses that you want to allow through

    Create a deny rule for the blocked countries in the NACL associated with each of the EC2 instances

    (Incorrect)

    Use ALB geo match statement listing the countries that you want to block

    Use WAF IP set statement that specifies the IP addresses that you want to allow through

    (Correct)

Explanation

Correct options:

Use WAF geo match statement listing the countries that you want to block

Use WAF IP set statement that specifies the IP addresses that you want to allow through

AWS WAF is a web application firewall that helps protect your web applications or APIs against common web exploits that may affect availability, compromise security, or consume excessive resources. AWS WAF gives you control over how traffic reaches your applications by enabling you to create security rules that block common attack patterns and rules that filter out specific traffic patterns you define.

You can deploy AWS WAF on Amazon CloudFront as part of your CDN solution, the Application Load Balancer that fronts your web servers or origin servers running on EC2, or Amazon API Gateway for your APIs.

AWS WAF - How it Works via - https://aws.amazon.com/waf/

To block specific countries, you can create a WAF geo match statement listing the countries that you want to block, and to allow traffic from IPs of the remote development team, you can create a WAF IP set statement that specifies the IP addresses that you want to allow through. You can combine the two rules as shown below:

via - https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-geo-match.html

Incorrect options:

Create a deny rule for the blocked countries in the NACL associated to each of the EC2 instances - A network access control list (ACL) is an optional layer of security for your VPC that acts as a firewall for controlling traffic in and out of one or more subnets. NACL does not have the capability to block traffic based on geographic match conditions.

Use ALB geo match statement listing the countries that you want to block

Use ALB IP set statement that specifies the IP addresses that you want to allow through

An Application Load Balancer (ALB) operates at the request level (layer 7), routing traffic to targets – EC2 instances, containers, IP addresses, and Lambda functions based on the content of the request. Ideal for advanced load balancing of HTTP and HTTPS traffic, Application Load Balancer provides advanced request routing targeted at the delivery of modern application architectures, including microservices and container-based applications.

An ALB cannot block or allow traffic based on geographic match conditions or IP based conditions. Both these options have been added as distractors.

References:

https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-geo-match.html

https://aws.amazon.com/blogs/security/how-to-use-aws-waf-to-filter-incoming-traffic-from-embargoed-countries/
Question 9: Correct

A blog hosting company has an existing SaaS product architected as an on-premises three-tier web application. The blog content is posted and updated several times a day by multiple authors, so the Linux web servers serve content from a centralized file share on a NAS server. The CTO at the company has done an extensive technical review and highlighted to the company management that the existing infrastructure is not optimized. The company would like to migrate to AWS so that the resources can be dynamically scaled in response to load. The on-premises infrastructure and AWS Cloud are connected using Direct Connect.

As a Solutions Architect Professional, which of the following solutions would you recommend to the company so that it can migrate the web infrastructure to AWS without delaying the content updation process?

    Attach an EFS file system to the on-premises servers to act as the NAS server. Mount the same EFS file system to the AWS based web servers running on EC2 instances to serve the content

    (Correct)

    Provision EC2 instances based web servers with an Auto Scaling group. Create a nightly data transfer batch job to update the web server instances from the NAS server

    Provision a cluster of 20 EC2 instances based web servers running behind an Application Load Balancer on AWS across multiple Availability Zones. Share an EBS volume among all instances for accessing the content. Develop custom code to periodically synchronize this volume with the NAS server

    Set up an on-premises file gateway using Storage Gateway to replace the NAS server and then replicate the existing content to AWS. On the AWS Cloud, mount the same Storage Gateway bucket to the EC2 instance based web servers to serve the content

Explanation

Correct option:

Attach an EFS file system to the on-premises servers to act as the NAS server. Mount the same EFS file system to the AWS based web servers running on EC2 instances to serve the content

Amazon Elastic File System (Amazon EFS) provides a simple, scalable, fully managed elastic NFS file system for use with AWS Cloud services and on-premises resources.

Amazon EFS is a Regional service storing data within and across multiple Availability Zones (AZs) for high availability and durability. Amazon EC2 instances can access your file system across AZs, Regions, and VPCs, while on-premises servers can access using AWS Direct Connect or AWS VPN. You can connect to Amazon EFS file systems from EC2 instances in other AWS Regions using an inter-Region VPC peering connection, and from on-premises servers using an AWS VPN connection. EFS is also POSIX compliant.

via - https://aws.amazon.com/efs/

For the given use-case, you can attach an EFS file system to your on-premises servers, copy your data to it, and then process it in the cloud as desired, leaving your data in AWS for the long term. Further, you can mount the EFS file system from the EC2 instances for a concurrent access. Connecting to EFS is similar to connecting to your network drive since it supports NFS protocols, which are standard for network attached storage (NAS) devices. This ensures that the company can migrate the web infrastructure to AWS Cloud without delaying the content updation process as the underlying workflows do not need to be modified.

via - https://aws.amazon.com/blogs/aws/amazon-efs-update-on-premises-access-via-direct-connect-vpc/

Incorrect options:

Set up an on-premises file gateway using Storage Gateway to replace the NAS server and then replicate the existing content to AWS. On the AWS Cloud, mount the same Storage Gateway bucket to the EC2 instance based web servers to serve the content

AWS Storage Gateway is a hybrid cloud storage service that gives you on-premises access to virtually unlimited cloud storage. The service provides three different types of gateways – Tape Gateway, File Gateway, and Volume Gateway – that seamlessly connect on-premises applications to cloud storage, caching data locally for low-latency access.

AWS Storage Gateway's file interface, or file gateway, offers you a seamless way to connect to the cloud in order to store application data files and backup images as durable objects on Amazon S3 cloud storage. File gateway offers SMB or NFS-based access to data in Amazon S3 with local caching.

File Gateway Overview: via - https://docs.aws.amazon.com/storagegateway/latest/userguide/StorageGatewayConcepts.html

The issue with transitioning to Storage Gateway is that you would run into performance issues once the local cache fills up and then the application has to source the data from S3 which is the underlying object based storage. Moreover, S3 is not POSIX compliant and it does not support operations such as file append. The file gateway takes care of these abstractions but it also adds up to making this architecture not as scalable as just mounting EFS on both the on-premises servers as well as EC2 instances. So this option is incorrect.

Provision a cluster of 20 EC2 instances based web servers running behind an Application Load Balancer on AWS across multiple Availability Zones. Share an EBS volume among all instances for accessing the content. Develop custom code to periodically synchronize this volume with the NAS server - You cannot share an EBS volume with multiple instances (unless it's a nitro based instance. Even for nitro based instances, you can only share an EBS volume with up to 16 instances in the same Availability Zone). So this option is incorrect.

Provision EC2 instances based web servers with an Auto Scaling group. Create a nightly data transfer batch job to update the web server instances from the NAS server - Using a nightly data transfer batch job to update the web server instances from the NAS server implies that the solution would delay the content updation process, which is a key requirement of the use-case. So this option is incorrect.

References:

https://aws.amazon.com/efs/

https://aws.amazon.com/blogs/aws/amazon-efs-update-on-premises-access-via-direct-connect-vpc/

https://aws.amazon.com/about-aws/whats-new/2017/02/aws-storage-gateway-supports-running-file-gateway-in-ec2-and-adds-file-share-security-options/
Question 10: Correct

A leading video creation and distribution company has recently migrated to AWS Cloud for digitally transforming its movie business. The company wants to speed up its media distribution process and improve data security while also reducing costs and eliminating errors. The company wants to set up a Digital Cinema Network that would allow it to store content in Amazon S3 as well as to accelerate the online distribution of movies and advertising to theaters in 38 key media markets worldwide. The company also wants to do an accelerated online migration of hundreds of terabytes of files from their on-premises data center to Amazon S3 and then establish a mechanism for low-latency access of the migrated data for ongoing updates from the on-premises applications.

As a Solutions Architect Professional, which of the following would you select as the MOST performant solution for the given use-case?

    Use AWS DataSync to migrate existing data to Amazon S3 and then use File Gateway for low latency access to the migrated data for ongoing updates from the on-premises applications

    (Correct)

    Use AWS DataSync to first migrate existing data to Amazon S3 and then configure low latency access to the migrated data for ongoing updates from the on-premises applications

    Use S3 Transfer Acceleration to migrate existing data to Amazon S3 and then use DataSync for low latency access to the migrated data for ongoing updates from the on-premises applications

    Use File Gateway configuration of AWS Storage Gateway to migrate data to Amazon S3 and then use S3 Transfer Acceleration for low latency access to the migrated data for ongoing updates from the on-premises applications

Explanation

Correct options:

Use AWS DataSync to migrate existing data to Amazon S3 and then use File Gateway for low latency access to the migrated data for ongoing updates from the on-premises applications

AWS DataSync is an online data transfer service that simplifies, automates, and accelerates copying large amounts of data to and from AWS storage services over the internet or AWS Direct Connect. AWS DataSync fully automates and accelerates moving large active datasets to AWS, up to 10 times faster than command-line tools. It is natively integrated with Amazon S3, Amazon EFS, Amazon FSx for Windows File Server, Amazon CloudWatch, and AWS CloudTrail, which provides seamless and secure access to your storage services, as well as detailed monitoring of the transfer.

DataSync uses a purpose-built network protocol and scale-out architecture to transfer data. A single DataSync agent is capable of saturating a 10 Gbps network link. DataSync fully automates the data transfer. It comes with retry and network resiliency mechanisms, network optimizations, built-in task scheduling, monitoring via the DataSync API and Console, and CloudWatch metrics, events, and logs that provide granular visibility into the transfer process. DataSync performs data integrity verification both during the transfer and at the end of the transfer.

How DataSync Works via - https://aws.amazon.com/datasync/

AWS Storage Gateway is a hybrid cloud storage service that gives you on-premises access to virtually unlimited cloud storage. The service provides three different types of gateways – Tape Gateway, File Gateway, and Volume Gateway – that seamlessly connect on-premises applications to cloud storage, caching data locally for low-latency access. File gateway offers SMB or NFS-based access to data in Amazon S3 with local caching.

The combination of DataSync and File Gateway is the correct solution. AWS DataSync enables you to automate and accelerate online data transfers to AWS storage services. File Gateway then provides your on-premises applications with low latency access to the migrated data.

AWS File Gateway: via - https://aws.amazon.com/storagegateway/file/

Incorrect options:

Use AWS DataSync to first migrate existing data to Amazon S3 and then configure low latency access to the migrated data for ongoing updates from the on-premises applications - AWS DataSync is used to easily transfer data to and from AWS with up to 10x faster speeds. It is used to transfer data and should not be used for low latency access to the migrated data for ongoing updates from the on-premises applications.

Use File Gateway configuration of AWS Storage Gateway to migrate data to Amazon S3 and then use S3 Transfer Acceleration for low latency access to the migrated data for ongoing updates from the on-premises applications - File Gateway can be used to move on-premises data to AWS Cloud, but it not an optimal solution for high volumes. Migration services such as DataSync are best suited for this purpose. S3 Transfer Acceleration cannot facilitate low latency access to the migrated data for ongoing updates from the on-premises applications.

Use S3 Transfer Acceleration to migrate existing data to Amazon S3 and then use DataSync for low latency access to the migrated data for ongoing updates from the on-premises applications - If your application is already integrated with the Amazon S3 API, and you want higher throughput for transferring large files to S3, S3 Transfer Acceleration can be used. However, DataSyncshould not be used for low latency access to the migrated data for ongoing updates from the on-premises applications.

via - https://aws.amazon.com/datasync/faqs/

References:

https://aws.amazon.com/datasync/features/

https://aws.amazon.com/storagegateway/file/

https://aws.amazon.com/datasync/faqs/
Question 11:

Skipped

A company has built its serverless solution using Amazon API Gateway REST API and AWS Lambda across multiple AWS Regions configured into a single AWS account. During peak hours, customers began to receive 429 Too Many Requests errors from multiple API methods. While troubleshooting the issue, the team realized that AWS Lambda function(s) have not been invoked for these API methods. Also, the company wants to provide a separate quota for its premium customers to access the APIs.

Which solution will you offer to meet this requirement?

    The error is the outcome of the company reaching its API Gateway account limit for calls per second, configure API keys as client identifiers using usage plans to define the per-client throttling limits for premium customers

    (Correct)

    The error is the outcome of the company reaching its API Gateway account per-method limit for calls per second, configure API keys as client identifiers using usage plans to define the per-client throttling limits for premium customers

    The error is the outcome of the company reaching its API Gateway account limit for calls per second, set Lambda-level throttling targets in the API Gateway usage plan, and configure customers to use a particular API method when the client identifier is set

    The error is the outcome of the company reaching its API Gateway limits for the steady-state requests per second (RPS) across all APIs within an AWS account per Region. These limits can be overwritten by configuring the AWS Regional throttling parameters to a greater value. However, based on the AWS account type, a limit is set to the overwritten throttling values

Explanation

Correct options:

The error is the outcome of the company reaching its API Gateway account limit for calls per second, configure API keys as client identifiers using usage plans to define the per-client throttling limits for premium customers

After you create, test, and deploy your APIs, you can use API Gateway usage plans to make them available as product offerings for your customers. You can configure usage plans and API keys to allow customers to access selected APIs, and begin throttling requests to those APIs based on defined limits and quotas. These can be set at the API, or API method level.

Per-client throttling limits are applied to clients that use API keys associated with your usage plan as a client identifier. Note that these limits can't be higher than the per-account limits.

When request submissions exceed the steady-state request rate and burst limits, API Gateway begins to throttle requests. Clients may receive 429 Too Many Requests error responses at this point. Since the error is at API Gateway, the Lambda functions configured are not invoked at all.

How throttling limit settings are applied in API Gateway: via - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html

Incorrect options:

"The error is the outcome of the company reaching its API Gateway account per-method limit for calls per second, configure API keys as client identifiers using usage plans to define the per-client throttling limits for premium customers - You should note that a throttling limit sets the target point at which request throttling should start. This can be set at the API or API method level. The use case states that the 429 Too Many Requests errors were received from multiple API methods, so the API Gateway reached its limit at the API level since none of the methods invoked the downstream Lambda function. So this option is incorrect.

The error is the outcome of the company reaching its API Gateway account limit for calls per second, set Lambda-level throttling targets in the API Gateway usage plan, and configure customers to use a particular API method when the client identifier is set - This is incorrect. You cannot define Lambda-level throttling targets in the API Gateway usage plan.

The error is the outcome of the company reaching its API Gateway limits for the steady-state requests per second (RPS) across all APIs within an AWS account per Region. These limits can be overwritten by configuring the AWS Regional throttling parameters to a greater value. However, based on the AWS account type, a limit is set to the overwritten throttling values - Per-account limits are applied to all APIs in an account in a specified Region. The account-level rate limit can be increased upon request - higher limits are possible with APIs that have shorter timeouts and smaller payloads. To request an increase in account-level throttling limits per Region, contact the AWS Support Center. It cannot be done from the AWS account directly.

References:

https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html

https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html
Question 12:

Skipped

A leading gaming company runs multiple game platforms that need to store game state, player data, session history, and leaderboards. The company is looking to move to AWS Cloud to scale reliably to millions of concurrent users and requests while ensuring consistently low latency measured in single-digit milliseconds. The engineering team at the company is evaluating multiple in-memory data stores with the ability to power its on-demand, live leaderboard. The company's leaderboard requires high availability, low latency, and real-time processing to deliver customizable user data for the community of its users.

As an AWS Certified Solutions Architect Professional, which of the following solutions would you recommend? (Select two)

    Develop the leaderboard using AWS Neptune as it meets the in-memory, high availability, low latency requirements

    Develop the leaderboard using RDS Aurora as it meets the in-memory, high availability, low latency requirements

    Develop the leaderboard using DynamoDB with DynamoDB Accelerator (DAX) as it meets the in-memory, high availability, low latency requirements

    (Correct)

    Develop the leaderboard using DynamoDB as it meets the in-memory, high availability, low latency requirements

    Develop the leaderboard using ElastiCache Redis as it meets the in-memory, high availability, low latency requirements

    (Correct)

Explanation

Correct options:

Develop the leaderboard using ElastiCache Redis as it meets the in-memory, high availability, low latency requirements

Amazon ElastiCache for Redis is a blazing fast in-memory data store that provides sub-millisecond latency to power internet-scale real-time applications. Amazon ElastiCache for Redis is a great choice for real-time transactional and analytical processing use cases such as caching, chat/messaging, gaming leaderboards, geospatial, machine learning, media streaming, queues, real-time analytics, and session store. ElastiCache for Redis can be used to power the live leaderboard, so this option is correct.

ElastiCache for Redis Overview:

Develop the leaderboard using DynamoDB with DynamoDB Accelerator (DAX) as it meets the in-memory, high availability, low latency requirements

Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale. It's a fully managed, multi-Region, multi-master, durable database with built-in security, backup and restore, and in-memory caching for internet-scale applications.

DAX is a DynamoDB-compatible caching service that enables you to benefit from fast in-memory performance for demanding applications. So DynamoDB with DAX can be used to power the live leaderboard.

DAX Overview: via - https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html

Incorrect options:

Develop the leaderboard using AWS Neptune as it meets the in-memory, high availability, low latency requirements - Amazon Neptune is a fast, reliable, fully-managed graph database service that makes it easy to build and run applications that work with highly connected datasets. Neptune is not an in-memory database, so this option is not correct.

Develop the leaderboard using DynamoDB as it meets the in-memory, high availability, low latency requirements - DynamoDB is not an in-memory database, so this option is not correct.

Develop the leaderboard using RDS Aurora as it meets the in-memory, high availability, low latency requirements - Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud, that combines the performance and availability of traditional enterprise databases with the simplicity and cost-effectiveness of open source databases. Amazon Aurora features a distributed, fault-tolerant, self-healing storage system that auto-scales up to 64TB per database instance. Aurora is not an in-memory database, so this option is not correct.

References:

https://aws.amazon.com/elasticache/

https://aws.amazon.com/elasticache/redis/

https://aws.amazon.com/dynamodb/dax/
Question 13:

Skipped

An e-commerce company wants to rollout and test a blue-green deployment for its global application in the next couple of days. Most of the customers use mobile phones which are prone to DNS caching. The company has only two days left before the big sale will be launched.

As a Solutions Architect Professional, which of the following options would you suggest to test the deployment on as many users as possible in the given time frame?

    Use AWS Global Accelerator to distribute a portion of traffic to a particular deployment

    (Correct)

    Use Elastic Load Balancer to distribute traffic across deployments

    Use Route 53 weighted routing to spread traffic across different deployments

    Use AWS CodeDeploy deployment options to choose the right deployment

Explanation

Correct option:

Blue/green deployment is a technique for releasing applications by shifting traffic between two identical environments running different versions of the application: "Blue" is the currently running version and "green" the new version. This type of deployment allows you to test features in the green environment without impacting the currently running version of your application. When you’re satisfied that the green version is working properly, you can gradually reroute the traffic from the old blue environment to the new green environment. Blue/green deployments can mitigate common risks associated with deploying software, such as downtime and rollback capability.

Use AWS Global Accelerator to distribute a portion of traffic to a particular deployment - AWS Global Accelerator is a network layer service that directs traffic to optimal endpoints over the AWS global network, this improves the availability and performance of your internet applications. It provides two static anycast IP addresses that act as a fixed entry point to your application endpoints in a single or multiple AWS Regions, such as your Application Load Balancers, Network Load Balancers, Elastic IP addresses or Amazon EC2 instances, in a single or in multiple AWS regions.

AWS Global Accelerator uses endpoint weights to determine the proportion of traffic that is directed to endpoints in an endpoint group, and traffic dials to control the percentage of traffic that is directed to an endpoint group (an AWS region where your application is deployed).

While relying on the DNS service is a great option for blue/green deployments, it may not fit use-cases that require a fast and controlled transition of the traffic. Some client devices and internet resolvers cache DNS answers for long periods; this DNS feature improves the efficiency of the DNS service as it reduces the DNS traffic across the Internet, and serves as a resiliency technique by preventing authoritative name-server overloads. The downside of this in blue/green deployments is that you don’t know how long it will take before all of your users receive updated IP addresses when you update a record, change your routing preference or when there is an application failure.

With AWS Global Accelerator, you can shift traffic gradually or all at once between the blue and the green environment and vice-versa without being subject to DNS caching on client devices and internet resolvers, traffic dials and endpoint weights changes are effective within seconds.

Incorrect options:

Use Route 53 weighted routing to spread traffic across different deployments - Weighted routing lets you associate multiple resources with a single domain name (example.com) or subdomain name (acme.example.com) and choose how much traffic is routed to each resource. This can be useful for a variety of purposes, including load balancing and testing new versions of the software. As discussed earlier, DNS caching is a negative behavior for this use case and hence Route 53 is not a good option.

Use Elastic Load Balancer to distribute traffic across deployments - An ELB can distribute traffic across healthy instances. You can also use the ALB weighted target groups feature for blue/green deployments as it does not rely on the DNS service. In addition you don’t need to create new ALBs for the green environment. As the use-case refers to a global application, so this option cannot be used for a multi-Region solution which is needed for the given requirement.

Use AWS CodeDeploy deployment options to choose the right deployment - In CodeDeploy, a deployment is the process, and the components involved in the process, of installing content on one or more instances. This content can consist of code, web and configuration files, executables, packages, scripts, and so on. CodeDeploy deploys content that is stored in a source repository, according to the configuration rules you specify. Blue/Green deployment is one of the deployment types that CodeDeploy supports. AWS CodeDeploy performs deployments with AWS resources located in the same region, so this option is ruled out.

References:

https://aws.amazon.com/blogs/networking-and-content-delivery/using-aws-global-accelerator-to-achieve-blue-green-deployments

https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments.html

https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html#routing-policy-weighted
Question 14:

Skipped

The CTO at a multi-national retail company is pursuing an IT re-engineering effort to set up a hybrid network architecture that would facilitate the company's envisaged long-term data center migration from multiple on-premises data centers to the AWS Cloud. The current on-premises data centers are in different locations and are inter-linked via a private fiber. Due to the unique constraints of the existing legacy applications, using NAT is not an option. During the migration period, many critical applications will need access to other applications deployed in both the on-premises data centers and AWS Cloud.

As a Solutions Architect Professional, which of the following options would you suggest to set up a hybrid network architecture that is highly available and supports high bandwidth for a multi-Region deployment post-migration?

    Set up multiple software VPN connections between AWS cloud and the on-premises data centers. Configure each subnet's traffic through different VPN connections for redundancy. Make sure that no VPC CIDR blocks overlap one another or the on-premises network

    Set up a Direct Connect as primary connection for all on-premises data centers with another VPN as backup. Configure both connections to use the same virtual private gateway and BGP. Make sure that no VPC CIDR blocks overlap one another or the on-premises network

    Set up a Direct Connect to each on-premises data center from different service providers and configure routing to failover to the other on-premises data center's Direct Connect in case one connection fails. Make sure that no VPC CIDR blocks overlap one another or the on-premises network

    (Correct)

    Set up multiple hardware VPN connections between AWS cloud and the on-premises data centers. Configure each subnet's traffic through different VPN connections for redundancy. Make sure that no VPC CIDR blocks overlap one another or the on-premises network

Explanation

Correct option:

Set up a Direct Connect to each on-premises data center from different service providers and configure routing to failover to the other on-premises data center's Direct Connect in case one connection fails. Make sure that no VPC CIDR blocks overlap one another or the on-premises network

AWS Direct Connect links your on-premises data center to an AWS Direct Connect location over a standard Ethernet fiber-optic cable. One end of the cable is connected to your router, the other to an AWS Direct Connect router. With this connection, you can create virtual interfaces directly to public AWS services (for example, to Amazon S3) or to Amazon VPC, bypassing internet service providers in your network path. An AWS Direct Connect location provides access to AWS in the Region with which it is associated.

There are two types of Direct Connect connections:

Dedicated Connection: A physical Ethernet connection associated with a single customer. Customers can request a dedicated connection through the AWS Direct Connect console, the CLI, or the API. This supports speed of 1Gbps and 10Gbps.

Hosted Connection: A physical Ethernet connection that an AWS Direct Connect Partner provisions on behalf of a customer. Customers request a hosted connection by contacting a partner in the AWS Direct Connect Partner Program, who provisions the connection. This supports speed of 50Mbps, 100Mbps, 200Mbps, 300Mbps, 400Mbps, 500Mbps, 1Gbps, 2Gbps, 5Gbps, and 10Gbps.

via - https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html

As the use-case requires a hybrid network architecture that is highly available and supports high bandwidth, therefore you should configure the Direct Connect based hybrid network to achieve maximum resiliency for critical workloads by using separate connections from different service providers that terminate on separate devices in more than one location.

via - https://docs.aws.amazon.com/directconnect/latest/UserGuide/maximum_resiliency.html

via - https://docs.aws.amazon.com/directconnect/latest/UserGuide/high_resiliency.html

Incorrect options:

Set up multiple hardware VPN connections between AWS cloud and the on-premises data centers. Configure each subnet's traffic through different VPN connections for redundancy. Make sure that no VPC CIDR blocks overlap one another or the on-premises network

Set up multiple software VPN connections between AWS cloud and the on-premises data centers. Configure each subnet's traffic through different VPN connections for redundancy. Make sure that no VPC CIDR blocks overlap one another or the on-premises network

A VPN connection refers to the connection between your VPC and your own on-premises network. Site-to-Site VPN supports Internet Protocol security (IPsec) VPN connections. VPNs on AWS come in three flavours: hardware only, software only and a mix of hardware/software. The hardware only VPN uses a hardware VPN device to connect the virtual private gateway on the AWS end to a customer VPN gateway on the customers end, via IPsec VPN tunnels.

Hardware only VPNs include both the AWS managed AWS Site-to-Site VPN solution and the AWS VPN CloudHub.

You can also create a VPN connection to your remote network by using an Amazon EC2 instance in your VPC that's running a third party software VPN appliance.

The limitation with both options is that VPNs do not support high bandwidth data transfer as these operate over the public internet infrastructure. VPN Connections are a good solution if you have an immediate need, and have low to modest bandwidth requirements.

via - https://docs.aws.amazon.com/vpc/latest/userguide/vpn-connections.html

Set up a Direct Connect as primary connection for all on-premises data centers with another VPN as backup. Configure both connections to use the same virtual private gateway and BGP. Make sure that no VPC CIDR blocks overlap one another or the on-premises network - This option has been added as a distractor as you cannot have just one Direct Connect connection for multiple on-premises data centers that are in different locations. Also having a VPN as a backup does not provide a high-bandwidth and high-availability fallback option.

References:

https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html

https://docs.aws.amazon.com/directconnect/latest/UserGuide/maximum_resiliency.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpn-connections.html

https://medium.com/@datapath_io/aws-direct-connect-vs-vpn-vs-direct-connect-gateway-97900cdf7d04
Question 15:

Skipped

A digital media company wants to use AWS Cloudfront to manage its content. Firstly, it would like to allow only those new users who have paid the annual subscription fee the ability to download the application installation file. Secondly, only the subscribers should be able to view the files in the members' area.

As a Solutions Architect Professional, which of the following would you recommend as the MOST optimal solutions to deliver restricted content to the bona fide end users? (Select two)

    Use CloudFront signed URLs to restrict access to all the files in the members' area of the website

    Use CloudFront signed cookies to restrict access to the application installation file

    Use CloudFront signed URLs to restrict access to the application installation file

    (Correct)

    Use CloudFront signed cookies to restrict access to all the files in the members' area of the website

    (Correct)

    Require HTTPS for communication between CloudFront and your S3 origin

Explanation

Correct options:

Use CloudFront signed URLs to restrict access to the application installation file

Use CloudFront signed cookies to restrict access to all the files in the members' area of the website

Many companies that distribute content over the internet want to restrict access to documents, business data, media streams, or content that is intended for selected users, for example, users who have paid a fee.

To securely serve this private content by using CloudFront, you can do the following:

Require that your users access your private content by using special CloudFront signed URLs or signed cookies.

You should use a signed URL if you want to restrict access to individual files, for example, an installation download for your application. A signed URL includes additional information, for example, expiration date and time, that gives you more control over access to your content.

On the other hand, CloudFront signed cookies allow you to control who can access your content when you don't want to change your current URLs or when you want to provide access to multiple restricted files, for example, all of the files in the members' area of a website.

via - https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-choosing-signed-urls-cookies.html

Incorrect options:

Use CloudFront signed cookies to restrict access to the application installation file

Use CloudFront signed URLs to restrict access to all the files in the members' area of the website

These two options contradict the description provided in the explanation above, so these options are incorrect.

Require HTTPS for communication between CloudFront and your S3 origin

Requiring HTTPS for communication between CloudFront and your custom origin (or S3 origin) only enables secure access to the underlying content. You cannot use HTTPS to restrict access to your private content. So this option is incorrect.

References:

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-choosing-signed-urls-cookies.html

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html
Question 16:

Skipped

After a recent DDoS assault, the IT security team of a media company has asked the Security Engineer to revamp the security of the application to prevent future attacks. The website is hosted on an Amazon EC2 instance and data is maintained on Amazon RDS. A large part of the application data is static and this data is in the form of images.

Which of the following steps can be combined to constitute the revamped security model? (Select two)

    Configure the Amazon EC2 instance with an Auto Scaling Group (ASG) to scale in case of a DDoS assault. Front the ASG with AWS Web Application Firewall (AWS WAF) for another layer of security

    Use Amazon Route 53 to distribute traffic

    (Correct)

    Move the static content to Amazon S3, and front this with an Amazon CloudFront distribution. Configure another layer of protection by adding AWS Web Application Firewall (AWS WAF) to the CloudFront distribution

    (Correct)

    Configure Amazon Inspector with AWS Security Hub to mitigate DDoS attacks by continual scanning that delivers near real-time vulnerability findings

    Use Global Accelerator to distribute traffic

Explanation

Correct options:

Use Amazon Route 53 to distribute traffic

Move the static content to Amazon S3, and front this with an Amazon CloudFront distribution. Configure another layer of protection by adding AWS Web Application Firewall (AWS WAF) to the CloudFront distribution

AWS WAF is a web application firewall that helps protect web applications from attacks by allowing you to configure rules that allow, block, or monitor (count) web requests based on conditions that you define. These conditions include IP addresses, HTTP headers, HTTP body, URI strings, SQL injection, and cross-site scripting.

AWS WAF is tightly integrated with Amazon CloudFront, the Application Load Balancer (ALB), Amazon API Gateway, and AWS AppSync – services that AWS customers commonly use to deliver content for their websites and applications. When you use AWS WAF on Amazon CloudFront, your rules run in all AWS Edge Locations, located around the world close to your end users. Blocked requests are stopped before they reach your web servers.

Route 53 DNS requests and subsequent application traffic routed through CloudFront are inspected inline. Always-on monitoring, anomaly detection, and mitigation against common infrastructure DDoS attacks such as SYN/ACK floods, UDP floods, and reflection attacks are built into both Route 53 and CloudFront.

Route 53 is also designed to withstand DNS query floods, which are real DNS requests that can continue for hours and attempt to exhaust DNS server resources. Route 53 uses shuffle sharding and anycast striping to spread DNS traffic across edge locations and help protect the availability of the service.

When used with Amazon CloudFront distribution, AWS Shield adds security against DDoS attacks.

AWS Shield is a managed Distributed Denial of Service (DDoS) protection service that safeguards applications running on AWS. AWS Shield provides always-on detection and automatic inline mitigations that minimize application downtime and latency, so there is no need to engage AWS Support to benefit from DDoS protection.

All AWS customers benefit from the automatic protections of AWS Shield Standard, at no additional charge. AWS Shield Standard defends against the most common, frequently occurring network and transport layer DDoS attacks that target your website or applications. When you use AWS Shield Standard with Amazon CloudFront and Amazon Route 53, you receive comprehensive availability protection against all known infrastructure (Layer 3 and 4) attacks.

Incorrect options:

Configure the Amazon EC2 instance with an Auto Scaling Group (ASG) to scale in case of a DDoS assault. Front the ASG with AWS Web Application Firewall (AWS WAF) for another layer of security - AWS WAF is tightly integrated with Amazon CloudFront, the Application Load Balancer (ALB), Amazon API Gateway, and AWS AppSync – services that AWS customers commonly use to deliver content for their websites and applications. WAF cannot be directly configured in front of an ASG, so this option is incorrect.

Use Global Accelerator to distribute traffic - Global Accelerator is effective in traffic distribution across AWS Regions. However, the given use case needs services that can help mitigate DDoS attacks.

Configure Amazon Inspector with AWS Security Hub to mitigate DDoS attacks by continual scanning that delivers near real-time vulnerability findings - Amazon Inspector is an automated vulnerability management service that continually scans Amazon Elastic Compute Cloud (EC2) and container workloads for software vulnerabilities and unintended network exposure. It cannot be used to mitigate DDoS attacks.

References:

https://aws.amazon.com/shield/

https://aws.amazon.com/blogs/security/how-to-protect-dynamic-web-applications-against-ddos-attacks-by-using-amazon-cloudfront-and-amazon-route-53/

https://aws.amazon.com/waf/faqs/
Question 17:

Skipped

A social media company has its corporate headquarters in New York with an on-premises data center using an AWS Direct Connect connection to the AWS VPC. The branch offices in San Francisco and Miami use Site-to-Site VPN connections to connect to the AWS VPC. The company is looking for a solution to have the branch offices send and receive data with each other as well as with their corporate headquarters.

As a Solutions Architect Professional, which of the following solutions would you recommend to meet these requirements?

    Set up VPN CloudHub between branch offices and corporate headquarters which will enable branch offices to send and receive data with each other as well as with their corporate headquarters

    (Correct)

    Set up VPC Peering between branch offices and corporate headquarters which will enable branch offices to send and receive data with each other as well as with their corporate headquarters

    Configure VPC Endpoints between branch offices and corporate headquarters which will enable branch offices to send and receive data with each other as well as with their corporate headquarters

    Configure Public Virtual Interfaces (VIFs) between branch offices and corporate headquarters which will enable branch offices to send and receive data with each other as well as with their corporate headquarters

Explanation

Correct option:

Set up VPN CloudHub between branch offices and corporate headquarters which will enable branch offices to send and receive data with each other as well as with their corporate headquarters

If you have multiple AWS Site-to-Site VPN connections, you can provide secure communication between sites using the AWS VPN CloudHub. This enables your remote sites to communicate with each other, and not just with the VPC. Sites that use AWS Direct Connect connections to the virtual private gateway can also be part of the AWS VPN CloudHub. The VPN CloudHub operates on a simple hub-and-spoke model that you can use with or without a VPC. This design is suitable if you have multiple branch offices and existing internet connections and would like to implement a convenient, potentially low-cost hub-and-spoke model for primary or backup connectivity between these remote offices.

Per the given use-case, the corporate headquarters has an AWS Direct Connect connection to the VPC and the branch offices have Site-to-Site VPN connections to the VPC. Therefore using the AWS VPN CloudHub, branch offices can send and receive data with each other as well as with their corporate headquarters.

VPN CloudHub: via - https://docs.aws.amazon.com/vpn/latest/s2svpn/VPN_CloudHub.html

Incorrect options:

Configure VPC Endpoints between branch offices and corporate headquarters which will enable branch offices to send and receive data with each other as well as with their corporate headquarters - A VPC endpoint enables you to privately connect your VPC to supported AWS services and VPC endpoint services powered by AWS PrivateLink without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection. Instances in your VPC do not require public IP addresses to communicate with resources in the service. AWS PrivateLink simplifies the security of data shared with cloud-based applications by eliminating the exposure of data to the public Internet.

When you use VPC endpoint, the traffic between your VPC and the other AWS service does not leave the Amazon network, therefore this option cannot be used to send and receive data between the remote branch offices of the company.

Set up VPC Peering between branch offices and corporate headquarters which will enable branch offices to send and receive data with each other as well as with their corporate headquarters - A VPC peering connection is a networking connection between two VPCs that enables you to route traffic between them using private IPv4 addresses or IPv6 addresses. Instances in either VPC can communicate with each other as if they are within the same network.

VPC peering facilitates a connection between two VPCs within the AWS network, therefore this option cannot be used to send and receive data between the remote branch offices of the company.

Configure Public Virtual Interfaces (VIFs) between branch offices and corporate headquarters which will enable branch offices to send and receive data with each other as well as with their corporate headquarters - AWS Direct Connect (DX) provides three types of virtual interfaces: public, private, and transit. To connect to AWS resources that are reachable by a public IP address (such as an Amazon Simple Storage Service bucket) or AWS public endpoints, use a public virtual interface. Therefore this option cannot be used to send and receive data between the remote branch offices of the company.

via - https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html

References:

https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-vpn-cloudhub-network-to-amazon.html

https://docs.aws.amazon.com/vpn/latest/s2svpn/VPN_CloudHub.html

https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html
Question 18:

Skipped

A silicon valley based unicorn startup recently launched a video-sharing social networking service called KitKot. The startup uses AWS Cloud to manage the IT infrastructure. Users upload video files up to 1 GB in size to a single EC2 instance based application server which stores them on a shared EFS file system. Another set of EC2 instances managed via an Auto Scaling group, periodically scans the EFS share directory for new files to process and generate new videos (for thumbnails and composite visual effects) according to the video processing instructions that are uploaded alongside the raw video files. Post-processing, the raw video files are deleted from the EFS file system and the results are stored in an S3 bucket. Links to the processed video files are sent via in-app notifications to the users. The startup has recently found that even as more instances are added to the Auto Scaling Group, many files are processed twice, therefore image processing speed is not improved.

As an AWS Certified Solutions Architect Professional, what would you recommend to improve the reliability of the solution as well as eliminate the redundant processing of video files?

    Refactor the application to run from Amazon S3 instead of the EFS file system and upload the video files directly to an S3 bucket via an API Gateway based REST API. Configure an S3 trigger to invoke a Lambda function each time a file is uploaded and the Lambda in turn processes the video and stores the processed files in another bucket. Leverage EventBridge events to trigger an SNS notification to send an in-app notification to the user containing the links to the processed files

    Refactor the application to run from S3 instead of EFS and upload the video files directly to an S3 bucket. Set up an EventBridge event to trigger a Lambda function on each file upload that puts a message in an SQS queue containing the link and the video processing instructions. Change the video processing application to read from SQS queue for new files and configure the queue depth metric to scale instances in the video processing Auto Scaling group. Leverage EventBridge events to trigger an SNS notification to the user containing the links to the processed files

    Refactor the application to run from S3 instead of EFS and upload the video files directly to an S3 bucket. Configure an S3 trigger to invoke a Lambda function on each video file upload to S3 that puts a message in an SQS queue containing the link and the video processing instructions. Change the video processing application to read from the SQS queue and the S3 bucket. Configure the queue depth metric to scale the size of the Auto Scaling group for video processing instances. Leverage EventBridge events to trigger an SNS notification to the user containing the links to the processed files

    (Correct)

    Create an hourly cron job on the application server to synchronize the contents of the EFS share with S3. Trigger a Lambda function every time a file is uploaded to S3 and process the video file to store the results in another S3 bucket. Once the file is processed, leverage EventBridge events to trigger an SNS notification to send an in-app notification to the user containing the links to the processed files

Explanation

Correct option:

Refactor the application to run from S3 instead of EFS and upload the video files directly to an S3 bucket. Configure an S3 trigger to invoke a Lambda function on each video file upload to S3 that puts a message in an SQS queue containing the link and the video processing instructions. Change the video processing application to read from the SQS queue and the S3 bucket. Configure the queue depth metric to scale the size of the Auto Scaling group for video processing instances. Leverage EventBridge events to trigger an SNS notification to the user containing the links to the processed files

For the given use-case, the primary way to address the issues related to reliability, as well as redundant processing of video files, is by introducing SQS into the solution stack. SQS offers a secure, durable, and available hosted queue that lets you integrate and decouple distributed software systems and components. SQS locks your messages during processing, so that multiple producers can send and multiple consumers can receive messages at the same time. Using the right combination of delay queues and visibility timeout, you can optimize the solution to address use-cases where the consumer application needs additional time to process messages such as the one in this scenario. Messages are put into the SQS queue via a Lambda function that is triggered when a new video file is uploaded to S3 for processing.

via - https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html

via - https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html

To ensure that the consumer applications running on the video processing instances can scale via an Auto Scaling group, you could use the SQS queue depth (known as the CloudWatch Amazon SQS metric - ApproximateNumberOfMessages) as the underlying metric. However, the issue with using a CloudWatch Amazon SQS metric like ApproximateNumberOfMessagesVisible for target tracking is that the number of messages in the queue might not change proportionally to the size of the Auto Scaling group that processes messages from the queue. An optimized solution would be to use a backlog per instance metric with the target value being the acceptable backlog per instance to maintain.

via - https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html

Incorrect options:

Refactor the application to run from Amazon S3 instead of the EFS file system and upload the video files directly to an S3 bucket via an API Gateway based REST API. Configure an S3 trigger to invoke a Lambda function each time a file is uploaded and the Lambda, in turn, processes the video and stores the processed files in another bucket. Leverage EventBridge events to trigger an SNS notification to send an in-app notification to the user containing the links to the processed files - API Gateway supports payload size of only up to 10 MB therefore this option is incorrect for the given use-case since you need to support file sizes of up to 1GB for video processing.

via - https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html

Refactor the application to run from S3 instead of EFS and upload the video files directly to an S3 bucket. Set up an EventBridge event to trigger a Lambda function on each file upload that puts a message in an SQS queue containing the link and the video processing instructions. Change the video processing application to read from SQS queue for new files and configure the queue depth metric to scale instances in the video processing Auto Scaling group. Leverage EventBridge events to trigger an SNS notification to the user containing the links to the processed files - You can certainly configure an EventBridge event to handle a new object upload on S3, which in turn triggers a lambda function. However, this is a roundabout way of propagating the object upload event to the Lambda function. So this is not the best fit option.

Create an hourly cron job on the application server to synchronize the contents of the EFS share with S3. Trigger a Lambda function every time a file is uploaded to S3 and process the video file to store the results in another S3 bucket. Once the file is processed, leverage EventBridge events to trigger an SNS notification to send an in-app notification to the user containing the links to the processed files - The issue with this option is lack of reliability. In case the Lambda function (which is triggered when a video file is uploaded to S3) fails to process a given video file, then the source video file would always remain unprocessed as there is no queue-based mechanism to re-process failed events. So this option is incorrect.

References:

https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html

https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html

https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html

https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html
Question 19:

Skipped

A leading mobility company wants to use AWS for its connected cab application that would collect sensor data from its electric cab fleet to give drivers dynamically updated map information. The company would like to build its new sensor service by leveraging fully serverless components that are provisioned and managed automatically by AWS. The development team at the company does not want an option that requires the capacity to be manually provisioned, as it does not want to respond manually to changing volumes of sensor data. The company has hired you as an AWS Certified Solutions Architect Professional to provide consultancy for this strategic initiative.

Given these constraints, which of the following solutions would you suggest as the BEST fit to develop this service?

    Ingest the sensor data in an Amazon SQS standard queue, which is polled by an application running on an EC2 instance and the data is written into an auto-scaled DynamoDB table for downstream processing

    Ingest the sensor data in an Amazon SQS standard queue, which is polled by a Lambda function in batches and the data is written into an auto-scaled DynamoDB table for downstream processing

    (Correct)

    Ingest the sensor data in Kinesis Data Firehose, which directly writes the data into an auto-scaled DynamoDB table for downstream processing

    Ingest the sensor data in a Kinesis Data Stream, which is polled by an application running on an EC2 instance and the data is written into an auto-scaled DynamoDB table for downstream processing

Explanation

Correct option: Ingest the sensor data in an Amazon SQS standard queue, which is polled by a Lambda function in batches and the data is written into an auto-scaled DynamoDB table for downstream processing

AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume. Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. SQS offers two types of message queues. Standard queues offer maximum throughput, best-effort ordering, and at-least-once delivery. SQS FIFO queues are designed to guarantee that messages are processed exactly once, in the exact order that they are sent.

You can use an AWS Lambda function to process messages in an Amazon Simple Queue Service (Amazon SQS) queue. Lambda event source mappings support standard queues and first-in, first-out (FIFO) queues. With Amazon SQS, you can offload tasks from one component of your application by sending them to a queue and processing them asynchronously.

via - https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html

AWS manages all ongoing operations and underlying infrastructure needed to provide a highly available and scalable message queuing service. With SQS, there is no upfront cost, no need to acquire, install, and configure messaging software, and no time-consuming build-out and maintenance of supporting infrastructure. SQS queues are dynamically created and scale automatically so you can build and grow applications quickly and efficiently. As there is no need to manually provision the capacity, so this is the correct option.

Incorrect options:

Ingest the sensor data in Kinesis Data Firehose, which directly writes the data into an auto-scaled DynamoDB table for downstream processing

Amazon Kinesis Data Firehose is a fully managed service for delivering real-time streaming data to destinations such as Amazon Simple Storage Service (Amazon S3), Amazon Redshift, Amazon OpenSearch Service, Splunk, and any custom HTTP endpoint or HTTP endpoints owned by supported third-party service providers, including Datadog, Dynatrace, LogicMonitor, MongoDB, New Relic, and Sumo Logic.

Firehose cannot directly write into a DynamoDB table, so this option is incorrect.

Ingest the sensor data in an Amazon SQS standard queue, which is polled by an application running on an EC2 instance and the data is written into an auto-scaled DynamoDB table for downstream processing

Ingest the sensor data in a Kinesis Data Stream, which is polled by an application running on an EC2 instance and the data is written into an auto-scaled DynamoDB table for downstream processing

Using an application on an EC2 instance is ruled out as the company wants to use fully serverless components. So both these options are incorrect.

References: https://aws.amazon.com/sqs/

https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html

https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html

https://aws.amazon.com/kinesis/data-streams/faqs/
Question 20:

Skipped

A multi-national company uses Amazon S3 as its data lake to store the data that flows into its business. This data is both structured and semi-structured and is organized under different buckets in the company's AWS account in the same Region. Hundreds of applications in the company's AWS account use structured data for running data analytics, event monitoring, report generation, event creation, and many more. While the semi-structured data runs through several transformations and is sent to downstream applications for further processing. While the company's security policy restricts S3 bucket access over the internet, the internal security team has requested tighter access rules for the applications using the S3 data lake.

Which combination of steps will you undertake to implement this requirement in the most efficient way? (Select three)

    From each application VPC, create a gateway endpoint for Amazon S3. Configure the endpoint policy to allow access to an S3 access point. Specify the route table that is used to access the access point

    Create an interface endpoint for Amazon S3 in each application's VPC. Configure the endpoint policy to allow access to an S3 access point. Create a VPC gateway attachment for the S3 endpoint

    Create an S3 access point for each application from each AWS account and attach the access points to the S3 bucket. Configure each access point to be accessible only from the application's VPC. Update the bucket policy to require access from an access point

    Create a gateway endpoint for Amazon S3 in the data lake VPC. Attach an endpoint policy to allow access to the S3 bucket only via the access points. Specify the route table that is used to access the bucket

    (Correct)

    Add a bucket policy on the buckets to deny access from applications outside the data lake VPC

    (Correct)

    In the AWS account that owns the S3 buckets, create an S3 access point for each bucket that the applications must use to access the data. Set up all applications in a single data lake VPC

    (Correct)

Explanation

Correct options:

In the AWS account that owns the S3 buckets, create an S3 access point for each bucket that the applications must use to access the data. Set up all applications in a single data lake VPC

Here is the approach that uses S3 Access Points in combination with VPC endpoint policies to make it easy to manage access to shared datasets on Amazon S3. The idea is to create an Amazon S3 VPC-Only Access Point, and then use it in the VPC endpoint policy to control access to the S3 bucket. You also have the option to use bucket policies to firewall S3 bucket access to VPCs only.

S3 Access Points are unique hostnames that you can create to enforce distinct permissions and network controls for any request made through the Access Point.

Some key features of S3 Access Points: 1. Access Points contain a hostname, an AWS ARN, and an AWS IAM resource policy. 2. Access Points by default have a specific setting to Block Public Access. 3. Access Points are unique to an account and Region. 4. Access Points can have custom IAM permissions for a user or application. 5. Access Points can have custom IAM permissions to specific objects in a bucket via a prefix to precisely control access. 6. Access Points can be configured to accept requests only from a virtual private cloud (VPC) to restrict Amazon S3 data access to a private network.

Use S3 Access Points to manage access to shared datasets on Amazon S3: via - https://aws.amazon.com/blogs/storage/managing-amazon-s3-access-with-vpc-endpoints-and-s3-access-points/

How to set up S3 Access Points for an Amazon S3 bucket and use it with VPC endpoint: via - https://aws.amazon.com/blogs/storage/managing-amazon-s3-access-with-vpc-endpoints-and-s3-access-points/

Create a gateway endpoint for Amazon S3 in the data lake VPC. Attach an endpoint policy to allow access to the S3 bucket only via the access points. Specify the route table that is used to access the bucket

You can access Amazon S3 from your VPC using gateway VPC endpoints. After you create the gateway endpoint, you can add it as a target in your route table for traffic destined from your VPC to Amazon S3. Leverage the following condition with a deny effect in the gateway endpoint policy:

"Condition": {
                "ArnNotLikeIfExists": {
                    "s3:DataAccessPointArn": "arn:aws:s3:us-east-1:<Account ID>:accesspoint/*"
                }

When a new Amazon S3 bucket is created, to allow access from the VPC, you can create an S3 Access Point on the S3 bucket. The preceding condition in the VPC endpoint policy would automatically allow access to this new S3 bucket via the Access Point, without having to edit the VPC endpoint policy.

Add a bucket policy on the buckets to deny access from applications outside the data lake VPC

Broadly, the steps involved are: 1. Create a VPC-only Access Point for the Amazon S3 bucket. This makes sure that this Access Point can only be accessed by resources in a specific VPC.

    Create Amazon S3 gateway endpoint in the VPC and add a VPC endpoint policy. This VPC endpoint policy will have a statement that allows S3 access only via access points owned by the organization. We take advantage of the account ID in the Access Point ARN to make this possible.

    Add a bucket policy on the bucket to allow access only from the VPC: This prevents any access from outside the VPC.

Incorrect options:

Create an interface endpoint for Amazon S3 in each application's VPC. Configure the endpoint policy to allow access to an S3 access point. Create a VPC gateway attachment for the S3 endpoint - You need to create an S3 access point for Amazon S3 in each application's VPC and not an interface endpoint. Gateway attachments are used with Transit Gateways and not with S3 endpoints.

Create an S3 access point for each application from each AWS account and attach the access points to the S3 bucket. Configure each access point to be accessible only from the application's VPC. Update the bucket policy to require access from an access point - This statement is incorrect. Amazon S3 access point can only be created from the AWS account that owns the S3 bucket.

From each application VPC, create a gateway endpoint for Amazon S3. Configure the endpoint policy to allow access to an S3 access point. Specify the route table that is used to access the access point - There is no need to create separate VPCs for each application, as just a single data lake VPC can house all applications, which allows you to configure a single S3 gateway endpoint having a policy with a condition to limit access via a common prefix for the access points of all the S3 buckets for the data lake. So this option is not the best fit.

References:

https://aws.amazon.com/s3/features/access-points/

https://aws.amazon.com/blogs/storage/managing-amazon-s3-access-with-vpc-endpoints-and-s3-access-points/
Question 21:

Skipped

The DevOps team at a financial services company has provisioned a new GPU optimized EC2 instance X by choosing the default security group of the default VPC. The team can ping instance X from other instances in the VPC. The other instances were also created using the default security group. The next day, the team launches another GPU optimized instance Y by creating a new security group and attaching it to instance Y. All other configuration options for instance Y are chosen as default. However, the team is not able to ping instance Y from other instances in the VPC.

As a Solutions Architect Professional, which of the following would you identify as the root cause of the issue?

    Instance X is in the default security group. The default rules for the default security group allow inbound traffic from network interfaces (and their associated instances) that are assigned to the same security group. Instance Y is in a new security group. The default rules for a security group that you create allow no inbound traffic

    (Correct)

    Instance X is in the default security group. The default rules for the default security group allow inbound traffic from all sources. Instance Y is in a new security group. The default rules for a security group that you create allow no inbound traffic

    Instance X is in the default security group. The default rules for the default security group allow no inbound traffic from all sources. Instance Y is in a new security group. The default rules for a security group that you create allow inbound traffic from all sources

    Instance X is in the default security group. The default rules for the default security group allow no inbound traffic from network interfaces (and their associated instances) that are assigned to the same security group. Instance Y is in a new security group. The default rules for a security group that you create allow inbound traffic from all sources

Explanation

Correct option:

Instance X is in the default security group. The default rules for the default security group allow inbound traffic from network interfaces (and their associated instances) that are assigned to the same security group. Instance Y is in a new security group. The default rules for a security group that you create allow no inbound traffic

A security group acts as a virtual firewall that controls the traffic for one or more instances. When you launch an instance, you can specify one or more security groups; otherwise, AWS uses the default security group. You can add rules to each security group that allows traffic to or from its associated instances. You can modify the rules for a security group at any time; the new rules are automatically applied to all instances that are associated with the security group. To decide whether to allow traffic to reach an instance, AWS evaluates all the rules from all the security groups that are associated with the instance.

The following are the default rules for a default security group:

Allow inbound traffic from network interfaces (and their associated instances) that are assigned to the same security group.

Allows all outbound traffic

So instance X can be pinged from other instances in the default security group.

The following are the default rules for a security group that you create:

Allows no inbound traffic

Allows all outbound traffic

So instance Y cannot be pinged from other instances in the new security group created by the DevOps team because any new security group allows no inbound traffic by default.

Please note that once you've created a security group, you can change its inbound rules to reflect the type of inbound traffic that you want to reach the associated instances. You can also change its outbound rules.

via - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html

Incorrect options:

Instance X is in the default security group. The default rules for the default security group allow inbound traffic from all sources. Instance Y is in a new security group. The default rules for a security group that you create allow no inbound traffic - The default security group allows inbound traffic only from network interfaces (and their associated instances) that are assigned to the same security group. The default security group does not allow inbound traffic from all sources. So this option is incorrect.

Instance X is in the default security group. The default rules for the default security group allow no inbound traffic from network interfaces (and their associated instances) that are assigned to the same security group. Instance Y is in a new security group. The default rules for a security group that you create allow inbound traffic from all sources - The default security group allows inbound traffic from network interfaces (and their associated instances) that are assigned to the same security group. So this option is incorrect.

Instance X is in the default security group. The default rules for the default security group allow no inbound traffic from all sources. Instance Y is in a new security group. The default rules for a security group that you create allow inbound traffic from all sources - The default security group allows inbound traffic from network interfaces (and their associated instances) that are assigned to the same security group. It's wrong to say that the default security group allows no inbound traffic from all sources. So this option is incorrect.

References:

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html
Question 22:

Skipped

A healthcare company has migrated some of its IT infrastructure to AWS Cloud and is looking for a solution to enable real-time data transfer between AWS and its data centers to reduce the turnaround time to generate the patients' diagnostic reports. The company wants to build a patient results archival solution such that only the most frequently accessed results are available as cached data locally while backing up all results on Amazon S3.

As a Solutions Architect Professional, which of the following solutions would you recommend for this use-case?

    Use AWS direct connect to store the most frequently accessed results locally for low-latency access while storing the full backup of results in an Amazon S3 bucket

    Use AWS Volume Gateway - Stored Volume - to store the most frequently accessed results locally for low-latency access while storing the full volume with all results in its Amazon S3 service bucket

    Use AWS Snowball Edge Storage Optimized device to store the most frequently accessed results locally for low-latency access while storing the full backup of results in an Amazon S3 bucket

    Use AWS Volume Gateway - Cached Volume - to store the most frequently accessed results locally for low-latency access while storing the full volume with all results in its Amazon S3 service bucket

    (Correct)

Explanation

Correct option:

Use AWS Volume Gateway - Cached Volume - to store the most frequently accessed results locally for low-latency access while storing the full volume with all results in its Amazon S3 service bucket

AWS Storage Gateway is a hybrid cloud storage service that gives you on-premises access to virtually unlimited cloud storage. The service provides three different types of gateways – Tape Gateway, File Gateway, and Volume Gateway – that seamlessly connect on-premises applications to cloud storage, caching data locally for low-latency access.

With cached volumes, the AWS Volume Gateway stores the full volume in its Amazon S3 service bucket, and just the recently accessed data is retained in the gateway’s local cache for low-latency access.

via - https://aws.amazon.com/storagegateway/volume/

Incorrect options:

Use AWS direct connect to store the most frequently accessed results locally for low-latency access while storing the full backup of results in an Amazon S3 bucket - AWS Direct Connect lets you establish a dedicated network connection between your network and one of the AWS Direct Connect locations. Direct connect cannot be used to store the most frequently accessed results locally for low-latency access.

Use AWS Volume Gateway - Stored Volume - to store the most frequently accessed results locally for low-latency access while storing the full volume with all results in its Amazon S3 service bucket - With stored volumes, your entire data volume is available locally in the gateway, for fast read access. Volume Gateway also maintains an asynchronous copy of your stored volume in the service’s Amazon S3 bucket. This does not fit the requirements per the given use-case, hence this option is not correct.

Use AWS Snowball Edge Storage Optimized device to store the most frequently accessed results locally for low-latency access while storing the full backup of results in an Amazon S3 bucket - You can use Snowball Edge Storage Optimized device to securely and quickly transfer dozens of terabytes to petabytes of data to AWS. Snowball Edge Storage Optimized device cannot be used to store the most frequently accessed results locally for low-latency access.

Reference:

https://aws.amazon.com/storagegateway/volume/
Question 23:

Skipped

An analytics company wants to leverage ElastiCache for Redis in cluster mode to enhance the performance and scalability of its existing two-tier application architecture. The ElastiCache cluster is configured to listen on port 6379. The company has hired you as an AWS Certified Solutions Architect Professional to build a secure solution so that the cache data is secure and protected from unauthorized access.

Which of the following steps would address the given use-case? (Select three)

    Enable CloudTrail to monitor the API Calls for the ElastiCache cluster

    Configure the security group for the ElastiCache cluster with the required rules to allow inbound traffic from the cluster itself as well as from the cluster's clients on port 6379

    (Correct)

    Enable CloudWatch Logs to monitor the security credentials for the ElastiCache cluster

    Configure the ElastiCache cluster to have both in-transit as well as at-rest encryption

    (Correct)

    Create the cluster with auth-token parameter and make sure that the parameter is included in all subsequent commands to the cluster

    (Correct)

    Configure the security group for the ElastiCache cluster with the required rules to allow outbound traffic to the cluster's clients on port 6379

Explanation

Correct options:

Configure the ElastiCache cluster to have both in-transit as well as at-rest encryption

You can use both in-transit as well as at-rest encryption to guard against unauthorized access of your data on the server. In-transit encryption encrypts your data whenever it is moving from one place to another, such as between nodes in your cluster or between your cluster and your application. At-rest encryption encrypts your on-disk data during sync and backup operations.

via - https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/encryption.html

Create the cluster with auth-token parameter and make sure that the parameter is included in all subsequent commands to the cluster

Redis authentication tokens enable Redis to require a token (password) before allowing clients to run commands, thereby improving data security. You can require that users enter a token on a token-protected Redis server. You also need to include it in all subsequent commands to the replication group or cluster.

via - https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/auth.html

Configure the security group for the ElastiCache cluster with the required rules to allow inbound traffic from the cluster itself as well as from the cluster's clients on port 6379

You can create a VPC security group to restrict access to the cluster instances. Configure rules that only allow inbound traffic from the cluster itself as well as from the cluster's clients on port 6379. Typically the ElastiCache cluster is accessed from the web servers running on EC2 instances. You can configure the security groups like so:

via - https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/elasticache-vpc-accessing.html

Incorrect options:

Configure the security group for the ElastiCache cluster with the required rules to allow outbound traffic to the cluster's clients on port 6379 - As mentioned in the explanation above, you need to create a security group that allows inbound traffic from the cluster itself as well as from the cluster's clients on port 6379. Creating a security group rule that allows outbound traffic from the cluster on port 6379 is not relevant to the use-case.

Enable CloudWatch Logs to monitor the security credentials for the ElastiCache cluster

Enable CloudTrail to monitor the API Calls for the ElastiCache cluster

Both these options are added as distractors since both CloudWatch Logs and CloudTrail can be used for post-facto analysis to ascertain the series of access events relevant to the cluster. These options will not prevent unauthorized access.

References:

https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/encryption.html

https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/auth.html

https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/elasticache-vpc-accessing.html
Question 24:

Skipped

An e-commerce company has hired an AWS Certified Solutions Architect Professional to design a dual-tier storage layer for its flagship application running on EC2 instances. One of the tiers of this storage layer is a data tier that should support a POSIX file system shared across many systems. The other tier of this storage layer is a service tier that supports static file content that requires block storage with more than a million IOPS.

Which of the following solutions represent the BEST combination of AWS services for this use-case? (Select two)

    Use EC2 Instance Store as the data tier of the storage layer

    Use Amazon S3 as the data tier of the storage layer

    Use EC2 Instance Store as the service tier of the storage layer

    (Correct)

    Use EFS as the data tier of the storage layer

    (Correct)

    Use EBS volumes with Provisioned IOPS as the service tier of the storage layer

Explanation

Correct options:

Use EFS as the data tier of the storage layer

Amazon Elastic File System (Amazon EFS) provides a simple, scalable, fully managed elastic NFS file system for use with AWS Cloud services and on-premises resources.

Amazon EFS is a Regional service storing data within and across multiple Availability Zones (AZs) for high availability and durability. Amazon EC2 instances can access your file system across AZs, Regions, and VPCs, while on-premises servers can access using AWS Direct Connect or AWS VPN. You can connect to Amazon EFS file systems from EC2 instances in other AWS Regions using an inter-Region VPC peering connection, and from on-premises servers using an AWS VPN connection. EFS is also POSIX compliant and can be shared across many systems, so it fits the given use-case.

via - https://aws.amazon.com/efs/

Use EC2 Instance Store as the service tier of the storage layer

An instance store (also known as ephemeral storage) provides temporary block-level storage for your instance. This storage is located on disks that are physically attached to the host computer. Instance store is ideal for the temporary storage of information that changes frequently such as buffers, caches, scratch data, and other temporary content, or for data that is replicated across a fleet of instances, such as a load-balanced pool of web servers. Instance store volumes are included as part of the instance's usage cost.

As Instance Store based volumes provide high random I/O performance at low cost (as the storage is part of the instance's usage cost) and the fault-tolerant architecture can adjust for the loss of any instance, therefore you should use Instance Store based EC2 instances for this use-case.

EC2 Instance Store Overview: via - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html

Per the given use-case, the key requirement for the service tier of the storage layer is to support block storage with more than a million IOPS. The Max IOPS per volume supported by EBS is only 256K for provisioned IOPS SSD (io2 block express). On the other hand, SSD-based instance store volumes support more than a million IOPS for random reads. So, this option is correct.

EBS Volume Summary: via - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/storage-optimized-instances.html

Incorrect options:

Use EBS volumes with Provisioned IOPS as the service tier of the storage layer - As mentioned in the explanation above, the Max IOPS per volume supported by EBS is 256K for provisioned IOPS SSD (io2 block express), so this option is incorrect.

Use EC2 Instance Store as the data tier of the storage layer - This option is incorrect as Instance Store cannot be used as data tier for the given use-case because it cannot be shared across many systems at the same time. This capability is only offered by EFS.

Use Amazon S3 as the data tier of the storage layer - This option is incorrect as S3 is not POSIX compliant.

References:

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/storage-optimized-instances.html
Question 25:

Skipped

An automobile company helps more than 20 million web and mobile users browse automobile dealer inventory, read vehicle reviews, and consume other automobile-related content by leveraging its library of 50 million vehicle photos uploaded by auto dealers. The company is planning a key update with even better image quality and faster load times on the company's website as well as mobile apps but the existing image-handling solution based on Cloudera MapReduce clusters is not the right tool for the job. The company now wants to switch to a serverless solution on AWS Cloud. As part of this process, the engineering team has been studying various best practices for serverless solutions. They intend to use AWS Lambda extensively and are looking at the salient features to consider when using Lambda as the backbone for the serverless architecture.

As a Solutions Architect Professional, which of the following would you identify as key considerations for a serverless architecture? (Select three)

    By default, Lambda functions always operate from an AWS-owned VPC and hence have access to any public internet address or public AWS APIs. Once a Lambda function is VPC-enabled, it will need a route through a NAT gateway in a public subnet to access public resources

    (Correct)

    Serverless databases and Lambda complement each other and you should install databases on the Lambda functions

    Since Lambda functions can scale extremely quickly, it's a good idea to deploy a CloudWatch Alarm that notifies your team when function metrics such as ConcurrentExecutions or Invocations exceeds the expected threshold

    (Correct)

    If you intend to reuse code in more than one Lambda function, you should consider creating a Lambda Layer for the reusable code

    (Correct)

    The bigger your deployment package, the slower your Lambda function will cold-start. Hence, AWS suggests packaging dependencies as a separate package from the actual Lambda package

    Lambda allocates compute power in proportion to the memory you allocate to your function. AWS, thus recommends to over provision your function time out settings for the proper performance of Lambda functions

Explanation

Correct options:

By default, Lambda functions always operate from an AWS-owned VPC and hence have access to any public internet address or public AWS APIs. Once a Lambda function is VPC-enabled, it will need a route through a NAT gateway in a public subnet to access public resources - Lambda functions always operate from an AWS-owned VPC. By default, your function has full ability to make network requests to any public internet address — this includes access to any of the public AWS APIs. For example, your function can interact with AWS DynamoDB APIs to PutItem or Query for records. You should only enable your functions for VPC access when you need to interact with a private resource located in a private subnet. An RDS instance is a good example.

Once your function is VPC-enabled, all network traffic from your function is subject to the routing rules of your VPC/Subnet. If your function needs to interact with a public resource, you will need a route through a NAT gateway in a public subnet.

When to VPC-Enable a Lambda Function: via - https://aws.amazon.com/blogs/architecture/best-practices-for-developing-on-aws-lambda/

Since Lambda functions can scale extremely quickly, it's a good idea to deploy a CloudWatch Alarm that notifies your team when function metrics such as ConcurrentExecutions or Invocations exceeds the expected threshold - Since Lambda functions can scale extremely quickly, this means you should have controls in place to notify you when you have a spike in concurrency. A good idea is to deploy a CloudWatch Alarm that notifies your team when function metrics such as ConcurrentExecutions or Invocations exceeds your threshold. You should create an AWS Budget so you can monitor costs on a daily basis.

If you intend to reuse code in more than one Lambda function, you should consider creating a Lambda Layer for the reusable code - You can configure your Lambda function to pull in additional code and content in the form of layers. A layer is a ZIP archive that contains libraries, a custom runtime, or other dependencies. With layers, you can use libraries in your function without needing to include them in your deployment package. Layers let you keep your deployment package small, which makes development easier. A function can use up to 5 layers at a time.

You can create layers, or use layers published by AWS and other AWS customers. Layers support resource-based policies for granting layer usage permissions to specific AWS accounts, AWS Organizations, or all accounts. The total unzipped size of the function and all layers can't exceed the unzipped deployment package size limit of 250 MB.

Incorrect options:

Lambda allocates compute power in proportion to the memory you allocate to your function. AWS, thus recommends to over provision your function time out settings for the proper performance of Lambda functions - Lambda allocates compute power in proportion to the memory you allocate to your function. This means you can over-provision memory to run your functions faster and potentially reduce your costs. However, AWS recommends that you should not over-provision your function time out settings. Always understand your code performance and set a function time out accordingly. Over-provisioning function timeout often results in Lambda functions running longer than expected and unexpected costs.

The bigger your deployment package, the slower your Lambda function will cold-start. Hence, AWS suggests packaging dependencies as a separate package from the actual Lambda package - This statement is added as a distractor. All the dependencies can be packaged into the single Lambda deployment package without any performance impact.

Serverless databases and Lambda complement each other and you should install databases on the Lambda functions - This statement is incorrect. AWS Lambda does not support installation of databases.

References:

https://aws.amazon.com/blogs/architecture/best-practices-for-developing-on-aws-lambda/

https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
Question 26:

Skipped

A big data analytics company is leveraging AWS Cloud to process Internet of Things (IoT) sensor data from the field devices of an agricultural sciences company. The analytics company stores the IoT sensor data in Amazon DynamoDB tables. To detect anomalous behaviors and respond quickly, all changes to the items stored in the DynamoDB tables must be logged in near real-time.

As an AWS Certified Solutions Architect Professional, which of the following solutions would you recommend to meet the requirements of the given use-case so that it requires minimal custom development and infrastructure maintenance?

    Set up DynamoDB Streams to capture and send updates to a Lambda function that outputs records directly to Kinesis Data Analytics (KDA). Detect and analyze anomalies in KDA and send notifications via SNS

    Set up CloudTrail to capture all API calls that update the DynamoDB tables. Leverage CloudTrail event filtering to analyze anomalous behaviors and send SNS notifications in case anomalies are detected

    Set up DynamoDB Streams to capture and send updates to a Lambda function that outputs records to Kinesis Data Analytics (KDA) via Kinesis Data Streams (KDS). Detect and analyze anomalies in KDA and send notifications via SNS

    (Correct)

    Configure event patterns in EventBridge events to capture DynamoDB API call events and set up Lambda function as a target to analyze anomalous behavior. Send SNS notifications when anomalous behaviors are detected

Explanation

Correct option:

Set up DynamoDB Streams to capture and send updates to a Lambda function that outputs records to Kinesis Data Analytics (KDA) via Kinesis Data Streams (KDS). Detect and analyze anomalies in KDA and send notifications via SNS

A DynamoDB stream is an ordered flow of information about changes to items in a DynamoDB table. When you enable a stream on a table, DynamoDB captures information about every modification to data items in the table for up to 24 hours.

Whenever an application creates, updates, or deletes items in the table, DynamoDB Streams writes a stream record with the primary key attributes of the items that were modified. A stream record contains information about a data modification to a single item in a DynamoDB table.

DynamoDB Streams supports the following stream record views:

KEYS_ONLY — Only the key attributes of the modified item NEW_IMAGE — The entire item, as it appears after it was modified OLD_IMAGE — The entire item, as it appears before it was modified NEW_AND_OLD_IMAGES — Both the new and the old images of the item

You can process DynamoDB streams in multiple ways. The most common approaches use AWS Lambda or a standalone application that uses the Kinesis Client Library (KCL) with the DynamoDB Streams Kinesis Adapter. The KCL is a client-side library that provides an interface to process DynamoDB stream changes. If you enable DynamoDB Streams on a table, you can associate the stream Amazon Resource Name (ARN) with an AWS Lambda function that you write. Immediately after an item in the table is modified, a new record appears in the table's stream. AWS Lambda polls the stream and invokes your Lambda function synchronously when it detects new stream records.

Please review this excellent reference architecture for DynamoDB streams design patterns:

via - https://aws.amazon.com/blogs/database/dynamodb-streams-use-cases-and-design-patterns/

For the given use-case, you can use a Lambda function to capture updates from DynamoDB Streams and send those records to KDA via KDS. You can then detect and analyze anomalies in KDA and send notifications via SNS.

How KDS Works: via - https://aws.amazon.com/kinesis/data-streams/

How KDA Works: via - https://aws.amazon.com/kinesis/data-analytics/

It is important to note that Kinesis Data Analytics (KDA) only supports the following streaming sources for an application:

A Kinesis data stream (KDS)

A Kinesis Data Firehose (KDF) delivery stream

Therefore, you cannot directly write the output of the records from a Lambda function to KDA, although you can certainly use a Lambda function to pre-process the incoming stream from either KDS or KDF.

Incorrect options:

Set up CloudTrail to capture all API calls that update the DynamoDB tables. Leverage CloudTrail event filtering to analyze anomalous behaviors and send SNS notifications in case anomalies are detected - You can use CloudTrail to capture API calls for DynamoDB as events. The calls captured include calls from the DynamoDB console and code calls to the DynamoDB API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for DynamoDB. The CloudTrail does not support the GetRecords API for DynamoDB Streams so you cannot use it to capture the actual records. Moreover, you cannot use CloudTrail event filtering to analyze anomalous behaviors as it is just a simple filtering mechanism based on certain event attributes such as Read Only, Event Source, Event Time etc.

Configure event patterns in EventBridge events to capture DynamoDB API call events and set up Lambda function as a target to analyze anomalous behavior. Send SNS notifications when anomalous behaviors are detected - EventBridge events service does not offer event type for DynamoDB as it's dependent on ClodTrail to get the relevant API call information. As explained above, CloudTrail itself cannot capture the DynamoDB streams records as CloudTrail does not support the GetRecords API for DynamoDB Streams. Therefore this option is incorrect.

Set up DynamoDB Streams to capture and send updates to a Lambda function that outputs records directly to Kinesis Data Analytics (KDA). Detect and analyze anomalies in KDA and send notifications via SNS - As mentioned earlier, KDA only supports KDS and KDF as the streaming sources for an application, so this option is incorrect.

References:

https://aws.amazon.com/blogs/database/dynamodb-streams-use-cases-and-design-patterns/

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.html

https://docs.aws.amazon.com/kinesisanalytics/latest/dev/how-it-works-input.html

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/logging-using-cloudtrail.html
Question 27:

Skipped

A stock trading firm uses AWS Cloud for its IT infrastructure. The firm runs several trading-risk simulation applications, developing complex algorithms to simulate diverse scenarios in order to evaluate the financial health of its customers. The firm stores customers' financial records on Amazon S3. The engineering team needs to implement an archival solution based on Amazon S3 Glacier to enforce regulatory and compliance controls on the archived data.

As a Solutions Architect Professional, which of the following solutions would you recommend?

    Use S3 Glacier vault to store the sensitive archived data and then use a vault lock policy to enforce compliance controls

    (Correct)

    Use S3 Glacier to store the sensitive archived data and then use an S3 Access Control List to enforce compliance controls

    Use S3 Glacier vault to store the sensitive archived data and then use an S3 Access Control List to enforce compliance controls

    Use S3 Glacier to store the sensitive archived data and then use an S3 lifecycle policy to enforce compliance controls

Explanation

Correct option:

Use S3 Glacier vault to store the sensitive archived data and then use a vault lock policy to enforce compliance controls

Amazon S3 Glacier is a secure, durable, and extremely low-cost Amazon S3 cloud storage class for data archiving and long-term backup. It is designed to deliver 99.999999999% durability, and provide comprehensive security and compliance capabilities that can help meet even the most stringent regulatory requirements.

An S3 Glacier vault is a container for storing archives. When you create a vault, you specify a vault name and the AWS Region in which you want to create the vault. S3 Glacier Vault Lock allows you to easily deploy and enforce compliance controls for individual S3 Glacier vaults with a vault lock policy. You can specify controls such as “write once read many” (WORM) in a vault lock policy and lock the policy from future edits. Therefore, this is the correct option.

Incorrect options:

Use S3 Glacier to store the sensitive archived data and then use an S3 lifecycle policy to enforce compliance controls - You can use lifecycle policy to define actions you want Amazon S3 to take during an object's lifetime. For example, use a lifecycle policy to transition objects to another storage class, archive them, or delete them after a specified period. It cannot be used to enforce compliance controls. Therefore, this option is incorrect.

Use S3 Glacier vault to store the sensitive archived data and then use an S3 Access Control List to enforce compliance controls - Amazon S3 access control lists (ACLs) enable you to manage access to buckets and objects. It cannot be used to enforce compliance controls. Therefore, this option is incorrect.

Use S3 Glacier to store the sensitive archived data and then use an S3 Access Control List to enforce compliance controls - Amazon S3 access control lists (ACLs) enable you to manage access to buckets and objects. It cannot be used to enforce compliance controls. Therefore, this option is incorrect.

References:

https://docs.aws.amazon.com/amazonglacier/latest/dev/working-with-vaults.html

https://docs.aws.amazon.com/amazonglacier/latest/dev/vault-lock.html

https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-lifecycle.html
Question 28:

Skipped

A global healthcare company wants to develop a solution called Health Information Systems (HIS) on AWS Cloud that would allow the providers, payers, and government agencies to collaborate, anticipate and navigate the changing healthcare landscape. While pursuing this endeavor, the company would like to decrease its IT operational overhead so it could focus more intently on its core business - healthcare analytics. The solution should help the company eliminate the bottleneck created by manual provisioning of development pipelines while adhering to crucial governance and control requirements. As a means to this end, the company has set up "AWS Organizations" to manage several of these scenarios and would like to use Service Control Policies (SCP) for central control over the maximum available permissions for the various accounts in their organization. This allows the organization to ensure that all accounts stay within the organization’s access control guidelines.

As a Solutions Architect Professional, which of the following scenarios would you identify as correct regarding the given use-case? (Select three)

    SCPs affect all users and roles in attached accounts, including the root user

    (Correct)

    SCPs do not affect service-linked role

    (Correct)

    SCPs affect all users and roles in attached accounts, excluding the root user

    SCPs affect service-linked roles

    If a user or role has an IAM permission policy that grants access to an action that is either not allowed or explicitly denied by the applicable SCPs, the user or role can still perform that action

    If a user or role has an IAM permission policy that grants access to an action that is either not allowed or explicitly denied by the applicable SCPs, the user or role can't perform that action

    (Correct)

Explanation

Correct options:

If a user or role has an IAM permission policy that grants access to an action that is either not allowed or explicitly denied by the applicable SCPs, the user or role can't perform that action

SCPs affect all users and roles in attached accounts, including the root user

SCPs do not affect service-linked role

Service control policies (SCPs) are one type of policy that can be used to manage your organization. SCPs offer central control over the maximum available permissions for all accounts in your organization, allowing you to ensure your accounts stay within your organization’s access control guidelines.

In SCPs, you can restrict which AWS services, resources, and individual API actions the users and roles in each member account can access. You can also define conditions for when to restrict access to AWS services, resources, and API actions. These restrictions even override the administrators of member accounts in the organization.

Please note the following effects on permissions vis-a-vis the SCPs:

If a user or role has an IAM permission policy that grants access to an action that is either not allowed or explicitly denied by the applicable SCPs, the user or role can't perform that action.

SCPs affect all users and roles in the attached accounts, including the root user.

SCPs do not affect any service-linked role.

via - https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html

Incorrect options:

If a user or role has an IAM permission policy that grants access to an action that is either not allowed or explicitly denied by the applicable SCPs, the user or role can still perform that action

SCPs affect all users and roles in attached accounts, excluding the root user

SCPs affect service-linked roles

These three options contradict the explanation provided above, so these options are incorrect.

Reference:

https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html
Question 29:

Skipped

A retail company recently saw a huge spike in its monthly AWS spend. Upon further investigation, it was found that some developers had accidentally launched Amazon RDS instances in unexpected Regions. The company has hired you as an AWS Certified Solutions Architect Professional to establish best practices around least privileges for developers and control access to on-premises as well as AWS Cloud resources using Active Directory. The company has mandated you to institute a mechanism to control costs by restricting the level of access that developers have to the AWS Management Console without impacting their productivity. The company would also like to allow developers to launch RDS instances only in us-east-1 Region without limiting access to other services in any Region.

How can you help the company achieve the new security mandate while minimizing the operational burden on the DevOps team?

    Set up an IAM user for each developer and add them to the developer IAM group that has the PowerUserAccess managed policy attached to it. Attach a customer-managed policy that allows the developers access to RDS only in us-east-1 Region

    Configure SAML-based authentication tied to an IAM role that has the PowerUserAccess managed policy attached to it. Attach a customer-managed policy that denies access to RDS in any AWS Region except us-east-1

    (Correct)

    Configure SAML-based authentication tied to an IAM role that has a PowerUserAccess managed policy and a customer-managed policy that denies all the developers access to any AWS services except AWS Service Catalog. Within AWS Service Catalog, create a product containing only RDS service in us-east-1 region

    Configure SAML-based authentication tied to an IAM role that has the AdministrativeAccess managed policy attached to it. Attach a customer-managed policy that denies access to RDS in any AWS Region except us-east-1

Explanation

Correct option:

Configure SAML-based authentication tied to an IAM role that has the PowerUserAccess managed policy attached to it. Attach a customer-managed policy that denies access to RDS in any AWS Region except us-east-1

Security Assertion Markup Language 2.0 (SAML) is an open federation standard that allows an identity provider (IdP) to authenticate users and pass identity and security information about them to a service provider which is an AWS application or service for the current use-case. With SAML, you can enable a single sign-on experience for your users across many SAML-enabled applications and services. Users authenticate with the IdP once using a single set of credentials, and then get access to multiple applications and services without additional sign-ins.

For the given scenario, the company wants to control access to on-premises as well as AWS Cloud resources (specifically via the AWS Management Console) using Active Directory, so it should use SAML 2.0 federated users to access the AWS Management Console. You also create an IAM role with a trust policy that sets the SAML provider as the principal, which establishes a trust relationship between your organization and AWS. The role's permission policy establishes what users from your organization are allowed to do in AWS. In this case, the role will have a PowerUserAccess managed policy attached. As the PowerUserAccess managed policy will allow the developers to create RDS instances in any Region, therefore, you also need to attach a customer-managed policy that denies access to RDS in any AWS Region except us-east-1.

via - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-saml.html

At a high-level, it is useful to think of these access privileges in the form of this equation:

PowerUserAccess = AdministrativeAccess - IAM

Incorrect options:

Configure SAML-based authentication tied to an IAM role that has the AdministrativeAccess managed policy attached to it. Attach a customer-managed policy that denies access to RDS in any AWS Region except us-east-1 - Using an IAM role with an AdministrativeAccess managed policy attache to it would violate the key requirement of providing the least privileges for developers. PowerUserAccess provides full access to AWS services and resources but does not allow management of users and groups.

At a high-level, it is useful to think of these access privileges in the form of this equation:

PowerUserAccess = AdministrativeAccess - IAM

So, PowerUserAccess provides just the right access privileges required for the given use-case.

Set up an IAM user for each developer and add them to the developer IAM group that has the PowerUserAccess managed policy attached to it. Attach a customer-managed policy that allows the developers access to RDS only in us-east-1 Region - Setting up an IAM user for each developer and add them to the developer IAM group goes against the requirement of minimizing the operational burden on the DevOps team because this solution does not take advantage of the existing Active Directory that supports SAML-based authentication.

Configure SAML-based authentication tied to an IAM role that has a PowerUserAccess managed policy and a customer-managed policy that denies all the developers access to any AWS services except AWS Service Catalog. Within AWS Service Catalog, create a product containing only RDS service in us-east-1 region - This option is a distractor as it's too restrictive. As the customer-managed policy denies the developers access to any AWS services except AWS Service Catalog, therefore it would limit access to all other services in any Region, hence this option is incorrect.

References:

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-saml.html

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html
Question 30:

Skipped

A retail company has hired you as an AWS Certified Solutions Architect Professional to provide consultancy for managing a serverless application that consists of multiple API gateways, Lambda functions, S3 buckets and DynamoDB tables. The company is getting reports from customers that some of the application components seem to be lagging while loading dynamic images and some are timing out with the "504 Gateway Timeout" error. As part of your investigations to identify the root cause behind this issue, you can confirm that DynamoDB monitoring metrics are at acceptable levels.

Which of the following steps would you recommend to address these application issues? (Select two)

    Process and analyze the VPC Flow Logs to determine if there is packet loss between the Lambda function and S3

    Enable access logging for the API Gateway. Process and analyze the access logs in the API Gateway for HTTP errors to determine the root cause of the errors

    Enable execution logging for the API Gateway. Process and analyze the execution logs in the API Gateway for HTTP errors to determine the root cause of the errors

    Process and analyze the AWS X-Ray traces and analyze HTTP methods to determine the root cause of the HTTP errors

    (Correct)

    Process and analyze the Amazon CloudWatch Logs for Lambda function to determine processing times for requested images at pre-configured intervals

    (Correct)

Explanation

Correct options:

Process and analyze the Amazon CloudWatch Logs for Lambda function to determine processing times for requested images at pre-configured intervals

To help you troubleshoot failures in a function, the Lambda service logs all requests handled by a Lambda function and also automatically stores logs generated by your code through Amazon CloudWatch Logs. You can insert logging statements into your code to determine processing times for requested images. These logs can then be processed at certain pre-configured intervals for further analysis.

via - https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html

Process and analyze the AWS X-Ray traces and analyze HTTP methods to determine the root cause of the HTTP errors

You can use AWS X-Ray to visualize the components of your application, identify performance bottlenecks such as the one described in the use-case for processing images and troubleshoot those requests that resulted in an error. Your Lambda functions send trace data to X-Ray, and X-Ray processes the data to generate a service map and searchable trace summaries.

via - https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html

Incorrect options:

Enable execution logging for the API Gateway. Process and analyze the execution logs in the API Gateway for HTTP errors to determine the root cause of the errors

Enable access logging for the API Gateway. Process and analyze the access logs in the API Gateway for HTTP errors to determine the root cause of the errors

For an API Gateway, a "504 Gateway Timeout" error implies an "Endpoint Request Timed-out Exception".

via - https://docs.aws.amazon.com/apigateway/api-reference/handling-errors/

To troubleshoot an API Gateway REST API or WebSocket API that you're developing, enable execution logging and access logging to Amazon CloudWatch Logs. Execution logs contain helpful information that you can use to identify and fix most errors with your APIs. Access logs contain details about who accessed your API and how they accessed it, which you can also use for troubleshooting.

via - https://aws.amazon.com/premiumsupport/knowledge-center/api-gateway-cloudwatch-logs/

However, neither execution logs nor access logs at the API Gateway level will provide information to identify the root cause for the "504 Gateway Timeout" error as it needs to be analyzed at the source system level which is Lambda function for the given use-case, as that's where the images are being processing and the application is lagging or timing out for some of those images. Another thing to note is that only access logs are available for HTTP APIs, so you do not have access to execution logs for the given use-case.

Therefore, both of these options are incorrect.

Process and analyze the VPC Flow Logs to determine if there is packet loss between the Lambda function and S3

VPC Flow Logs allow you to capture information about the IP traffic going to and from network interfaces in your VPC. You can create a flow log for a VPC, a subnet, or a network interface. If you create a flow log for a subnet or VPC, each network interface in that subnet or VPC is monitored.

via - https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html

This option has been added as a distractor as you cannot use VPC Flow Logs to determine packet loss. AWS has a built-in tool called AWSSupport-SetupIPMonitoringFromVPC that you can use to monitor metrics such as latency and the percentage of packet loss across a network path. It monitors the selected target IP addresses by continuously running ping, MTR, TCP traceroute, and tracepath network diagnostic tests.

References:

https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html

https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html

https://docs.aws.amazon.com/apigateway/api-reference/handling-errors/

https://aws.amazon.com/premiumsupport/knowledge-center/api-gateway-cloudwatch-logs/

https://aws.amazon.com/blogs/networking-and-content-delivery/debugging-tool-for-network-connectivity-from-amazon-vpc/

https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html
