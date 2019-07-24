FROM microsoft/dotnet:2-sdk-jessie

ENV http_proxy http://proxy.sgti.lbn.fr:4480
ENV https_proxy http://proxy.sgti.lbn.fr:4480

WORKDIR /user/src/im.esuite.common

COPY ./IM.eSuite.Common/IM.eSuite.Common.csproj ./
COPY nuget.config ./

RUN dotnet restore

COPY ./IM.eSuite.Common .

RUN dotnet build
RUN dotnet pack IM.eSuite.Common.csproj -c Release

RUN dotnet nuget push ./bin/Release/*.nupkg -s https://nexus.im.saint-gobain.com/repository/imds-nuget-internal/ -k 950cfcf0-ebb5-3e7d-b0da-7a7a166cb6d2